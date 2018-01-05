import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import SliderMonitor from 'redux-slider-monitor';

export default createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    changePositionKey="ctrl-w"
    toggleVisibilityKey="ctrl-h"
    changeMonitorKey='ctrl-m'
    changePositionKey="ctrl-w"
    defaultSize={0.25}
  >
    <LogMonitor />
    <SliderMonitor />
  </DockMonitor>
);
