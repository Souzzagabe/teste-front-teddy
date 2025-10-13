module.exports = "test-file-stub";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

