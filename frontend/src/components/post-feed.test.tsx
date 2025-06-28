import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PostFeed from './post-feed';
import { usePosts } from '@/hooks/use-posts';
import { useUserStore } from '@/stores/user-store';

jest.mock('@/hooks/use-posts');
jest.mock('@/stores/user-store');

const mockUser = {
  name: { first: 'João', last: 'Silva' },
  picture: { medium: 'https://randomuser.me/api/portraits/med/men/1.jpg' },
  location: { city: 'São Paulo', state: 'SP' },
};

const mockPosts = [
  {
    id: 1,
    title: 'Primeiro Post',
    body: 'Conteúdo do primeiro post',
    userId: 1,
    isLocal: true,
  },
  {
    id: 2,
    title: 'Segundo Post',
    body: 'Conteúdo do segundo post',
    userId: 1,
    isLocal: false,
  },
];

describe('PostFeed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza skeletons quando está carregando', () => {
    (usePosts as jest.Mock).mockReturnValue({
      posts: [],
      loading: true,
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    });
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(<PostFeed />);
    
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renderiza mensagem quando não há posts', () => {
    (usePosts as jest.Mock).mockReturnValue({
      posts: [],
      loading: false,
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    });
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
    });

    render(<PostFeed />);
    
    expect(screen.getByText('Nenhum post encontrado')).toBeInTheDocument();
    expect(screen.getByText('Seja o primeiro a compartilhar algo interessante!')).toBeInTheDocument();
  });

  it('renderiza lista de posts quando há posts disponíveis', () => {
    (usePosts as jest.Mock).mockReturnValue({
      posts: mockPosts,
      loading: false,
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    });
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
    });

    render(<PostFeed />);
    
    expect(screen.getByText('Primeiro Post')).toBeInTheDocument();
    expect(screen.getByText('Segundo Post')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do primeiro post')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do segundo post')).toBeInTheDocument();
  });

  it('renderiza skeletons quando o usuário está carregando', () => {
    (usePosts as jest.Mock).mockReturnValue({
      posts: [],
      loading: false,
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    });
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(<PostFeed />);
    
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renderiza skeletons quando não há usuário', () => {
    (usePosts as jest.Mock).mockReturnValue({
      posts: [],
      loading: false,
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    });
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<PostFeed />);
    
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });
}); 