const IntroDecorator = props => (
  <span style={{fontFamily: 'Helvetica', fontSize: '1.5em'}}>{props.children}</span>
)

export default {
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [
    {
      type: 'block',
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Intro', value: 'intro', component: IntroDecorator, icon: () => 'T'},
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Underline', value: 'underline'},
        ],
      },
    },
    {
      type: 'imageAlt',
      name: 'imageAlt',
      title: 'Image',
      options: {
        hotspot: true,
      },
    },
  ],
}
