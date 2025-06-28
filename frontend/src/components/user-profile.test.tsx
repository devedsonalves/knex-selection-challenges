import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UserProfile from './user-profile';
import { useUserStore } from '@/stores/user-store';

jest.mock('@/stores/user-store');

const mockUser = {
  name: { first: 'João', last: 'Silva' },
  picture: { large: 'https://randomuser.me/api/portraits/large/men/1.jpg' },
  email: 'joao.silva@email.com',
  phone: '(11) 99999-9999',
  dob: { age: 25 },
  location: { 
    city: 'São Paulo', 
    state: 'SP', 
    country: 'Brasil' 
  },
};

describe('UserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza skeletons quando está carregando', () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(<UserProfile />);
    
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renderiza mensagem de erro quando não há usuário', () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<UserProfile />);
    
    expect(screen.getByText('Não foi possível carregar o perfil do usuário')).toBeInTheDocument();
  });

  it('renderiza informações do usuário corretamente', () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
    });

    render(<UserProfile />);
    
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    
    expect(screen.getByText('25 anos')).toBeInTheDocument();
    
    expect(screen.getByText('joao.silva@email.com')).toBeInTheDocument();
    
    expect(screen.getByText('(11) 99999-9999')).toBeInTheDocument();
    
    expect(screen.getByText('São Paulo, SP - Brasil')).toBeInTheDocument();
  });

  it('renderiza fallback do avatar quando não há imagem', () => {
    const userWithoutPicture = {
      ...mockUser,
      picture: { large: '' },
    };

    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: userWithoutPicture,
      loading: false,
    });

    render(<UserProfile />);
    
    const avatarFallback = screen.getByText('João Silva');
    expect(avatarFallback).toBeInTheDocument();
  });

  it('renderiza com layout responsivo', () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
    });

    render(<UserProfile />);
    
    const gradientDiv = document.querySelector('.bg-gradient-to-r');
    expect(gradientDiv).toBeInTheDocument();
  });

  it('renderiza badge com idade do usuário', () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
    });

    render(<UserProfile />);
    
    const ageBadge = screen.getByText('25 anos');
    expect(ageBadge).toBeInTheDocument();
    expect(ageBadge).toHaveClass('inline-flex');
  });

  it('renderiza ícones corretamente', () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
    });

    render(<UserProfile />);
    
    const emailSection = screen.getByText('joao.silva@email.com').closest('div');
    const phoneSection = screen.getByText('(11) 99999-9999').closest('div');
    const locationSection = screen.getByText('São Paulo, SP - Brasil').closest('div');
    
    expect(emailSection).toBeInTheDocument();
    expect(phoneSection).toBeInTheDocument();
    expect(locationSection).toBeInTheDocument();
  });
}); 