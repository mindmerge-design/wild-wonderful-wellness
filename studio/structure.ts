import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure = (S: any, context: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettingsPage')),
      S.divider(),

      S.listItem().title('Home').child(S.document().schemaType('home').documentId('homePage')),
      S.divider(),

      S.listItem()
        .title('Parks & Trails')
        .child(
          S.list()
            .title('Parks & Trails')
            .items([
              S.listItem()
                .title('Parks & Trails')
                .child(S.document().schemaType('parksTrails').documentId('parksTrailsPage')),
              orderableDocumentListDeskItem({
              type: 'parkTrail',
              title: 'Park/Trail',
              id: 'orderable-en-parkTrail',
              menuItems: [], // allow an array of `S.menuItem()` to be injected to orderable document list menu
              S,
              context,  
            }),
            ])
        ),
      S.divider(),

      S.listItem()
        .title('Events')
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .title('Events')
                .child(S.document().schemaType('events').documentId('eventsPage')),
              S.listItem()
                .title('Event')
                .child(
                  S.documentTypeList('event')
                    .title('Event')
                    .defaultOrdering([{field: 'eventDate', direction: 'asc'}])
                ),
            ])
        ),
      S.divider(),
      
      S.listItem()
            .title('Partners')
            .child(
          S.list()
            .title('Partners')
            .items([
              S.listItem()
                .title('Partners')
                .child(S.document().schemaType('partners').documentId('partnersPage')),
              orderableDocumentListDeskItem({
              type: 'partner',
              title: 'Partner',
              id: 'orderable-en-partner',
              menuItems: [], // allow an array of `S.menuItem()` to be injected to orderable document list menu
              S,
              context,  
            }),
            ])
        ),
      S.divider(),

      S.listItem()
        .title('Generic Page')
        .child(
          S.documentTypeList('generic')
            .title('Page')
            .defaultOrdering([{field: '_createdAt', direction: 'asc'}])
        ),
      S.divider(),

      // ...Other items
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          !['home', 'media.tag', 'generic', 'siteSettings','parksTrails','parkTrail','events','event','partners','partner'].includes(listItem.getId())
      ),
    ])
