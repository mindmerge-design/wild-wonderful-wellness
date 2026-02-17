import { defineField, defineType } from "sanity";

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'General', options: { collapsible: true, collapsed: false } },
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: true } },
    { name: 'introduction', title: 'Introduction', options: { collapsible: true, collapsed: true } },
    { name: 'howItWorks', title: 'How It Works', options: { collapsible: true, collapsed: true } },
    { name: 'contentSections', title: 'Content Sections', options: { collapsible: true, collapsed: true } },
    { name: 'footer', title: 'Footer', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // General
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'string',
      description: 'Full site URL',
      fieldset: 'general',
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Site Name',
      validation: (Rule: any) => Rule.required(),
      fieldset: 'general',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'location',
      fieldset: 'general',
    }),
    defineField({
      name: 'sharingImage',
      title: 'Sharing image (Facebook, Twitter, etc.)',
      type: 'image',
      fieldset: 'general',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'portableText',
      fieldset: 'footer',
    }),
  ],
})
