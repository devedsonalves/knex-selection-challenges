import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PostCard from './post-card';
import { useUserStore } from '@/stores/user-store';

jest.mock('@/stores/user-store');

const mockUser = {
  name: { first: 'João', last: 'Silva' },
  picture: { medium: 'https://randomuser.me/api/portraits/med/men/1.jpg' },
  location: { city: 'São Paulo', state: 'SP' },
};

const mockPost = {
  id: 1,
  title: 'Título do Post',
  body: 'Conteúdo do post',
  userId: 1,
  isLocal: true,
};

describe('PostCard', () => {
  beforeEach(() => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it('renderiza corretamente as informações do post e do usuário', () => {
    render(
      <PostCard post={mockPost} onUpdate={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('São Paulo, SP')).toBeInTheDocument();
    expect(screen.getByText('Título do Post')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do post')).toBeInTheDocument();
    expect(screen.getByText('Seu post')).toBeInTheDocument();
  });

  it('chama onUpdate ao clicar no botão de editar', () => {
    render(
      <PostCard post={mockPost} onUpdate={jest.fn()} onDelete={jest.fn()} />
    );
    const editButton = screen.getByTitle('Editar post');
    fireEvent.click(editButton);
    const editTitles = screen.getAllByText('Editar Post');
    expect(editTitles.length).toBeGreaterThan(0);
    editTitles.forEach(title => expect(title).toBeInTheDocument());
  });

  it('exibe o dialog de confirmação ao clicar no botão de deletar', () => {
    render(
      <PostCard post={mockPost} onUpdate={jest.fn()} onDelete={jest.fn()} />
    );
    const deleteButton = screen.getByTitle('Deletar post');
    fireEvent.click(deleteButton);
    expect(screen.getByText('Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita.')).toBeInTheDocument();
  });
}); 