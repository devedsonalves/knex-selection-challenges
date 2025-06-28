import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostForm from './post-form';

describe('PostForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o formulário com campos de título e conteúdo', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Título')).toBeInTheDocument();
    expect(screen.getByLabelText('Conteúdo')).toBeInTheDocument();
    expect(screen.getByText('Criar Post')).toBeInTheDocument();
  });

  it('renderiza com dados iniciais quando fornecidos', () => {
    const initialData = {
      title: 'Título Inicial',
      body: 'Conteúdo Inicial',
    };
    
    render(<PostForm onSubmit={mockOnSubmit} initialData={initialData} />);
    
    expect(screen.getByDisplayValue('Título Inicial')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Conteúdo Inicial')).toBeInTheDocument();
    expect(screen.getByText('Criar Post')).toBeInTheDocument();
  });

  it('renderiza sem card quando showCard é false', () => {
    render(<PostForm onSubmit={mockOnSubmit} showCard={false} />);
    
    expect(screen.queryByText('Criar Novo Post')).not.toBeInTheDocument();
    expect(screen.getByText('Criar Post')).toBeInTheDocument();
  });

  it('chama onCancel quando o botão cancelar é clicado', async () => {
    const user = userEvent.setup();
    render(<PostForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByText('Cancelar');
    await user.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('desabilita botão de submit quando formulário é inválido', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByText('Criar Post');
    expect(submitButton).toBeDisabled();
  });

  it('renderiza título correto do card', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Criar Novo Post')).toBeInTheDocument();
  });

  it('renderiza título correto do card quando há dados iniciais', () => {
    const initialData = {
      title: 'Título Inicial',
      body: 'Conteúdo Inicial',
    };
    
    render(<PostForm onSubmit={mockOnSubmit} initialData={initialData} />);
    expect(screen.getByText('Editar Post')).toBeInTheDocument();
  });

  it('renderiza campos com placeholders corretos', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);
    
    const titleInput = screen.getByPlaceholderText('Digite o título do seu post...');
    const bodyInput = screen.getByPlaceholderText('Compartilhe seus pensamentos...');
    
    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
  });
}); 