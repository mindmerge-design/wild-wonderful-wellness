import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from "sanity";

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
      subtitle: 'partnerType',
      media: 'logo',
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Document Title',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule: any) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 200,
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageAlt',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'imageAlt',
    }),
    defineField({
      name: 'partnerType',
      title: 'Partner Type',
      type: 'string',
      options: {
        list: [
          { title: 'Fitness', value: 'fitness' },
          { title: 'Wellness', value: 'wellness' },
          { title: 'Recreation', value: 'recreation' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Retail', value: 'retail' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'hasPassportPickup',
      title: 'Has Passport Pickup',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hasStampStation',
      title: 'Has Stamp Station',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'portableText',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'portableText',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    orderRankField({ type: 'title' }),
  ],
})
