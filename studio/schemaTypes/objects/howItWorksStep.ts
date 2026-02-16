import { defineField, defineType } from "sanity";

export default defineType({
  name: 'howItWorksStep',
  title: 'How It Works Step',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      media: 'icon',
    },
  },
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'imageAlt',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
})
