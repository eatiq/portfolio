'use client';

import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';

type Tab = {
  id: string;
  label: string;
};

type ContentSwitcherProps = {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tab: string) => void;
  children: (activeTab: string) => ReactNode;
};

export default function ContentSwitcher({
  tabs,
  defaultTab,
  activeTab: controlledTab,
  onChange,
  children,
}: ContentSwitcherProps) {
  const [internalTab, setInternalTab] = useState(defaultTab ?? tabs[0].id);
  const activeTab = controlledTab ?? internalTab;

  const handleSelect = (tabId: string) => {
    if (controlledTab === undefined) setInternalTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-3 mb-16 md:mb-24">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full border cursor-pointer transition-colors duration-200 ${
                isActive
                  ? 'bg-foreground/10 border-foreground/20 text-foreground'
                  : 'bg-transparent border-foreground/10 text-foreground/40 hover:border-foreground/20 hover:text-foreground/60'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Content area with crossfade */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children(activeTab)}
      </motion.div>
    </div>
  );
}
