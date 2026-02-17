import { defineField, defineType } from "sanity";

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
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
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
    }),
    defineField({
      name: 'howItWorks',
      title: 'How It Works',
      type: 'array',
      of: [{ type: 'titleAndDescription' }],
    }),
    defineField({
      name: 'pricesContent',
      title: 'Prices',
      type: 'portableText',
    }),
    defineField({
      name: 'bookletImage',
      title: 'Booklet Image',
      type: 'imageAlt',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
