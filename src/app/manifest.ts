import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KANBI - AI Powered Task Management',
    short_name: 'KANBI',
    description: 'Transform chaotic notes into organized Kanban boards instantly with AI',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/fevicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
