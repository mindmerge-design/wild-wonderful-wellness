import { defineField, defineType } from "sanity";

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  orderings: [
    {
      title: 'Event Date, Ascending',
      name: 'eventDateAsc',
      by: [{ field: 'eventDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eventDate',
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
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'organizer',
      title: 'Organizer',
      type: 'string',
    }),
    defineField({
      name: 'cost',
      title: 'Cost',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'isFree',
      title: 'Is Free',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'relatedPartner',
      title: 'Related Partner',
      type: 'reference',
      to: [{ type: 'partner' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
