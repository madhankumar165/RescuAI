import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { disasterApi } from '../services/api';
import { Message, DashboardStats, TimelinePoint, MapMarkerItem } from '../types';
import { DashboardHero } from '../components/dashboard/DashboardHero';
import { EmergencyMapSection } from '../components/dashboard/EmergencyMapSection';
import { MarkerDetailsDrawer } from '../components/dashboard/MarkerDetailsDrawer';
import { UrgentSpotlightSection } from '../components/dashboard/UrgentSpotlightSection';
import { AnalyticsSection } from '../components/dashboard/AnalyticsSection';
import { RequestTableSection } from '../components/dashboard/RequestTableSection';
import { NotificationToast } from '../components/dashboard/NotificationToast';

export const DashboardPage: React.FC = () => {
  const routeLocation = useLocation();
  const focusState = routeLocation.state as { focusLat?: number; focusLng?: number; focusLocation?: string } | null;

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [timeline, setTimeline] = useState<TimelinePoint[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarkerItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & State
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [disasterFilter, setDisasterFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  // Drawers & Notifications
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerItem | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mapFocusCenter, setMapFocusCenter] = useState<[number, number] | undefined>(
    focusState?.focusLat && focusState?.focusLng ? [focusState.focusLat, focusState.focusLng] : undefined
  );

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [sData, tData, mData, msgData] = await Promise.all([
        disasterApi.getDashboardStats(),
        disasterApi.getTimeline(),
        disasterApi.getMapData(),
        disasterApi.getMessages({
          search: search || undefined,
          priority: priorityFilter || undefined,
          disaster_type: disasterFilter || undefined,
          status: statusFilter || undefined,
          page,
          limit: 10,
        }),
      ]);
      setStats(sData);
      setTimeline(tData);
      setMapMarkers(mData);
      setMessages(msgData);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  }, [search, priorityFilter, disasterFilter, statusFilter, page]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleStatusChange = async (messageId: number, newStatus: string) => {
    try {
      await disasterApi.updateStatus(messageId, newStatus);
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const urgentMessages = useMemo(
    () => messages.filter((m) => m.priority_level === 'Critical' || m.priority_level === 'High'),
    [messages]
  );

  const latestTickerMessage = useMemo(() => {
    if (urgentMessages.length > 0) return urgentMessages[0].original_text;
    if (messages.length > 0) return messages[0].original_text;
    return undefined;
  }, [urgentMessages, messages]);

  const handleNavigateToMap = (lat: number, lng: number) => {
    setMapFocusCenter([lat, lng]);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleInspectMessage = (msg: Message) => {
    setSelectedMarker({
      id: msg.id,
      latitude: msg.latitude ?? 21.0,
      longitude: msg.longitude ?? 82.0,
      title: msg.disaster_type,
      priority: msg.priority_level,
      severity_score: msg.severity_score,
      text: msg.original_text,
      location_name: msg.location_name || 'Unknown',
      victim_count: msg.victim_count,
      status: msg.status,
      resources: msg.resources?.map((r) => r.resource_name) || [],
      created_at: msg.created_at || new Date().toISOString(),
    });
  };

  const totalTodayVal: number = stats ? stats.total_requests : 1294;
  const criticalVal: number = stats ? stats.critical_requests : 84;

  return (
    <div className="space-y-12 pb-24 relative">
      {/* Hero Section */}
      <DashboardHero
        totalToday={totalTodayVal}
        criticalCount={criticalVal}
        loading={loading}
        onRefresh={fetchDashboardData}
        unreadNotifications={urgentMessages.length}
        toggleNotifications={() => setShowNotifications(!showNotifications)}
        latestTickerMessage={latestTickerMessage}
      />

      {/* Live Map Section */}
      <EmergencyMapSection
        mapMarkers={mapMarkers}
        focusCenter={mapFocusCenter}
        onSelectMarker={setSelectedMarker}
      />

      {/* Urgent Action Cards */}
      <UrgentSpotlightSection
        urgentMessages={urgentMessages}
        onSelectMessage={handleInspectMessage}
        onNavigateToMap={handleNavigateToMap}
      />

      {/* Analytics & Disaster Breakdown */}
      <AnalyticsSection stats={stats} timeline={timeline} />

      {/* Request Queue Table */}
      <RequestTableSection
        messages={messages}
        page={page}
        setPage={setPage}
        onStatusChange={handleStatusChange}
        onInspectMessage={handleInspectMessage}
      />

      {/* Slide-Over Marker Details Drawer */}
      <MarkerDetailsDrawer
        marker={selectedMarker}
        onClose={() => setSelectedMarker(null)}
        onNavigateToLocation={handleNavigateToMap}
      />

      {/* Notification Toast Dropdown */}
      <NotificationToast
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        urgentMessages={urgentMessages}
        onSelectMessage={handleInspectMessage}
      />
    </div>
  );
};
