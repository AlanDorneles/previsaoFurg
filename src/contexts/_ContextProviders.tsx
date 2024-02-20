import React, { ReactNode } from 'react';
import { HourScopeProvider } from "./HourAnimation.jsx";
import { RadarIsCheckedProvider } from "./RadarIsChecked.jsx";
import { PreviousAndNextImageProvider } from "./PreviousAndNextImage.jsx";
import { StationsVisibleProvider } from "./RadarFilter.jsx";
import { CodeStationsProvider } from "./CodeStation.jsx";
import { FilterTypeRadarProvider } from "./TypeRadar.jsx";
import { RadarOrSateliteProvider } from './RadarOrSatelite.jsx';
import { PhenomenaProvider } from './Phenomena.jsx';

interface CombinedProvidersProps {
  children: ReactNode;
}

export function CombinedProviders({ children }: CombinedProvidersProps) {
  return (
    <HourScopeProvider>
      <RadarIsCheckedProvider>
        <PreviousAndNextImageProvider>
          <StationsVisibleProvider>
            <CodeStationsProvider>
              <FilterTypeRadarProvider>
                <PhenomenaProvider>
                  <RadarOrSateliteProvider>
                    {children}
                  </RadarOrSateliteProvider>
                </PhenomenaProvider>
              </FilterTypeRadarProvider>
            </CodeStationsProvider>
          </StationsVisibleProvider>
        </PreviousAndNextImageProvider>
      </RadarIsCheckedProvider>
    </HourScopeProvider>
  );
}
