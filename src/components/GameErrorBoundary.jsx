import { Component } from "react";
import { Link } from "react-router-dom";

export default class GameErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: 64 }}>{this.props.icon || "🎮"}</div>
          <h2 style={headingStyle}>Algo salió mal</h2>
          <p style={messageStyle}>
            Este juego tuvo un problema inesperado. Puedes volver al inicio e intentarlo de nuevo.
          </p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              style={buttonStyle}
              onClick={() => this.setState({ hasError: false })}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              🏠 Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const containerStyle = {
  fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  maxWidth: 480,
  margin: "0 auto",
  padding: "40px 16px",
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fef9f0 0%, #fff5f5 50%, #f0f4ff 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: "40px 28px",
  textAlign: "center",
  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
};

const headingStyle = {
  fontSize: 24,
  fontWeight: 800,
  margin: 0,
  color: "#333",
};

const messageStyle = {
  fontSize: 15,
  color: "#777",
  lineHeight: 1.5,
  margin: 0,
};

const buttonStyle = {
  marginTop: 8,
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "white",
  border: "none",
  borderRadius: 16,
  padding: "14px 32px",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  transition: "transform 0.2s",
  boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
};
