'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';

export function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-6 py-2 rounded-xl font-medium transition-all duration-200
          bg-gradient-to-r from-blue-500 to-indigo-500 text-white
          hover:shadow-lg hover:translate-y-[-1px]"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl
          bg-white/60 backdrop-blur-sm border border-white/20
          hover:bg-white/80 transition-all duration-200"
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || ''}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
        )}
        <span className="text-slate-700">{session.user?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2
          bg-white rounded-xl shadow-lg border border-slate-100
          backdrop-blur-sm"
        >
          <button
            onClick={() => signOut()}
            className="w-full px-4 py-2 text-left text-red-500 hover:bg-slate-50
              transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 