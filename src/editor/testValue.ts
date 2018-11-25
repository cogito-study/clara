const testValue = {
  document: {
    object: 'document',
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'This is editable ',
              },
              {
                text: 'rich',
                marks: [
                  {
                    type: 'bold',
                    data: {},
                  },
                ],
              },
              {
                text: ' text, ',
                marks: [],
              },
              {
                text: 'much',
                marks: [
                  {
                    type: 'italic',
                    data: {},
                  },
                ],
              },
              {
                text: ' better than a textarea!',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: "Since it's rich text, you can do things like turn a selection of text ",
                marks: [],
              },
              {
                text: 'bold',
                marks: [
                  {
                    type: 'bold',
                    data: {},
                  },
                ],
              },
              {
                text: ', or add a semantically rendered block quote in the middle of the page, like this:',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A wise quote. ',
                marks: [],
              },
            ],
          },
          {
            object: 'inline',
            type: 'link',
            data: {
              href: 'https://www.reddit.com/r/swimsuit/top/?sort=top&t=day',
            },
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'Sexy Swimsuit Girls!',
                    marks: [],
                  },
                ],
              },
            ],
          },
          {
            object: 'text',
            leaves: [
              {
                text: '',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Try it out for yourself!',
                marks: [],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default testValue;
