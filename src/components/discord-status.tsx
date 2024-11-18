'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SiSpotify, SiDiscord } from 'react-icons/si';
import { IoGameController } from 'react-icons/io5';
import { MdVerified } from 'react-icons/md';
import { FaCrown, FaMoon } from 'react-icons/fa';
import { BsCircleFill, BsDashCircleFill } from 'react-icons/bs';

interface Activity {
  type: number;
  name?: string;
  details?: string;
  state?: string;
  assets?: {
    large_text?: string;
    small_text?: string;
    large_image?: string;
    small_image?: string;
  };
  timestamps?: {
    start?: number;
    end?: number;
  };
}

interface DiscordStatusData {
  data: {
    discord_status: string;
    activities: Activity[];
    discord_user: {
      id: string;
      username: string;
      discriminator: string;
      avatar: string;
      global_name: string;
      public_flags: number;
    };
    spotify?: {
      track_id: string;
      timestamps: {
        start: number;
        end: number;
      };
      song: string;
      artist: string;
      album_art_url: string;
      album: string;
    };
  };
}

interface LanyardError {
  error: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'online':
      return <BsCircleFill className="w-[14px] h-[14px] text-[#23A559]" />;
    case 'idle':
      return <FaMoon className="w-[14px] h-[14px] text-[#F0B232]" />;
    case 'dnd':
      return <BsDashCircleFill className="w-[14px] h-[14px] text-[#F23F43]" />;
    default:
      return <BsCircleFill className="w-[14px] h-[14px] text-[#80848E]" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'online':
      return 'Online';
    case 'idle':
      return 'Idle';
    default:
      return 'Offline';
  }
};

const formatTime = (ms: number) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const getAssetUrl = (activity: any) => {
  if (!activity.assets?.large_image) return null;

  if (activity.assets.large_image.startsWith('spotify:')) {
    return `https://i.scdn.co/image/${activity.assets.large_image.slice('spotify:'.length)}`;
  }

  return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'bg-[#23A559]';
    case 'idle':
      return 'bg-[#F0B232]';
    case 'dnd':
      return 'bg-[#F23F43]';
    default:
      return 'bg-[#80848E]';
  }
};

export function DiscordStatus() {
  const [status, setStatus] = useState<DiscordStatusData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('');
  const userId = '827389583342698536';

  useEffect(() => {
    async function fetchDiscordStatus() {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        if (response.ok) {
          const data = (await response.json()) as DiscordStatusData;
          setStatus(data);
          setError(null);
        } else {
          const errorData = (await response.json()) as LanyardError;
          throw new Error(errorData.error || 'Failed to fetch status');
        }
      } catch (error) {
        console.error('Error fetching Discord status:', error);
        setError('Failed to load Discord status.');
      }
    }

    fetchDiscordStatus();
    const interval = setInterval(fetchDiscordStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!status?.data.activities?.[0]?.timestamps?.start) return;

    const updateElapsedTime = () => {
      const startTime = status.data.activities[0].timestamps?.start;
      if (!startTime) return;
      
      const elapsed = Date.now() - startTime;
      setElapsedTime(formatTime(elapsed));
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 1000);
    return () => clearInterval(interval);
  }, [status?.data.activities]);

  if (error) {
    return null;
  }

  if (!status) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full bg-white/10" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-3 w-32 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const discordData = status.data;
  const isOnline = discordData.discord_status !== 'offline';
  const activities = discordData.activities.filter((activity) => activity.type !== 4); // Filter out custom status
  const mainActivity = activities[0];
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}?size=160`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group w-full max-w-sm mx-auto"
    >
      <div className="relative flex flex-col items-center gap-3">
        <div className="relative flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="relative"
          >
            <img
              src={avatarUrl}
              alt="Discord Avatar"
              className="w-[60px] h-[60px] rounded-full ring-[3px] ring-[#5865F2]/10"
            />
            <div className="absolute -bottom-1 -right-1 w-[19px] h-[19px] rounded-full bg-[#1E1F22]/80 backdrop-blur-sm flex items-center justify-center">
              {getStatusIcon(discordData.discord_status)}
            </div>
          </motion.div>
        </div>

        <div className="min-w-0 w-full">
          <div className="flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {discordData.discord_user.global_name || discordData.discord_user.username}
            </span>
          </div>

          <div className="space-y-2 flex flex-col items-center mt-2">
            {discordData.spotify && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-3 text-sm text-[#949BA4]"
              >
                <img
                  src={discordData.spotify.album_art_url}
                  alt="Album Art"
                  className="w-12 h-12 rounded"
                />
                <div className="flex flex-col">
                  <span className="text-white">{discordData.spotify.song}</span>
                  <span>{discordData.spotify.artist.split(';')[0].trim()}</span>
                </div>
              </motion.div>
            )}

            {!discordData.spotify && mainActivity && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-3 text-sm text-[#949BA4]"
              >
                {mainActivity.assets?.large_image && (
                  <img
                    src={getAssetUrl(mainActivity) || ''}
                    alt={mainActivity.name || 'Activity'}
                    className="w-12 h-12 rounded"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-white">{mainActivity.name}</span>
                  <span>{mainActivity.details}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
