const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl text-foreground font-bold mb-4">404</h1>
        <p className="text-xl text-foreground mb-6">Ops! Página não encontrada</p>
        <a href="/" className="text-white bg-purple-600 hover:bg-purple-800 font-bold px-6 py-3 rounded-lg">
          Knex Social
        </a>
      </div>
    </div>
  );
};

export default NotFound;
