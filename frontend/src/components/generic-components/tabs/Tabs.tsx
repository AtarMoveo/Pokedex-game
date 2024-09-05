import React, { ReactElement, ReactNode, SyntheticEvent, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { tabsStyles, tabStyles } from './styles';

interface TabItem {
    label: string
    content: ReactNode
    icon?: ReactNode // Optional icon for each tab
    disabled?: boolean
}

interface GenericTabsProps {
    tabs: TabItem[]
    handleTabClick: (tab: number) => void
}

export function GenericTabs({ tabs, handleTabClick }: GenericTabsProps) {
    const [value, setValue] = useState(0)

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
        handleTabClick(newValue)
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    sx={tabsStyles}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            data-cy={`${tab.label}-tab`}
                            key={index}
                            label={tab.label}
                            icon={tab.icon as ReactElement} // Render the SVG icon
                            iconPosition="start" // Position the icon before the label
                            disabled={tab.disabled}
                            style={{ minWidth: 'auto', height: '2.375rem', padding: '0.25rem 0.5rem' }}
                            sx={tabStyles}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </>
    )
}

interface TabPanelProps {
    children: React.ReactNode
    index: number
    value: number
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
    return (
        <div
            style={{ gridArea: '2 / 1 / -1 / -1' }}
            role="tabpanel"
            hidden={value !== index}
            className='simple-tabpanel'
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{}}>
                    {children}
                </Box>
            )}
        </div>
    )
}