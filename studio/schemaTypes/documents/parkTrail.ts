import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from "sanity";

export default defineType({
  name: 'parkTrail',
  title: 'Park/Trail',
  type: 'document',
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
      subtitle: 'parkType',
      media: 'mainImage',
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
      name: 'mainImage',
      title: 'Main Image',
      type: 'imageAlt',
    }),
    defineField({
      name: 'parkType',
      title: 'Park Type',
      type: 'string',
      options: {
        list: [
          { title: 'Park', value: 'park' },
          { title: 'Trail', value: 'trail' },
          { title: 'State Forest', value: 'state-forest' },
          { title: 'Recreation Area', value: 'recreation-area' },
        ],
      },
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Restrooms', value: 'restrooms' },
          { title: 'Playground', value: 'playground' },
          { title: 'Swimming', value: 'swimming' },
        ],
      },
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
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'portableText',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string', 
    }),
     defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'lockboxLocation',
      title: 'Stamp/Lockbox Location',
      type: 'text',
      rows: 3,
      description: 'Directions to find stamp lockbox',
    }),
     defineField({
      name: 'lockboxPhoto',
      title: 'Lockbox Photo',
      type: 'imageAlt',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),   
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'imageGallery',
    }),  
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    orderRankField({ type: 'title' }),
  ],
})
