import type { Meta, StoryObj } from '@storybook/react';
 
import { SearchBar } from './SearchBar'
 
//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
};
 
export default meta;
type Story = StoryObj<typeof SearchBar>;
 
export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};