import type { Meta, StoryObj } from '@storybook/react';

import { Sort } from './Sort'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Sort> = {
  component: Sort,
};

export default meta;
type Story = StoryObj<typeof Sort>;

export const FirstStory: Story = {
  args: {
    options: ['Name A-Z', 'Name Z-A', 'Power (High to low)', 'Power (Low to high)', 'HP (High to low)', 'HP (Low to high)']
    //👇 The args you need here will depend on your component
  },
};