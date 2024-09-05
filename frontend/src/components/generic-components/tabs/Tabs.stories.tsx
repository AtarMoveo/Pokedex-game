import type { Meta, StoryObj } from '@storybook/react';

import {GenericTabs} from './Tabs'
import { CardsIcon, ListIcon } from '../../../assets/svg/svg';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof GenericTabs> = {
  component: GenericTabs,
};

export default meta;
type Story = StoryObj<typeof GenericTabs>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
    tabs: [
      { label: 'List', content: 'List', icon: <ListIcon /> },
      { label: 'Cards', content: 'Cards', icon: <CardsIcon /> },
    ]
  },
};