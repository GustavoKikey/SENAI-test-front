// src/Home.js

import React, { useState } from "react";
import Button from "../../components/Button";
import "./styles/Home.css";
import Modal from "react-modal";
import InputMask from "react-input-mask";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    institution: "",
  });

  const handleButtonClick = (message) => {
    alert(message);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { cpf, fullName, email, phoneNumber, specialization, institution } =
      formData;

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: cpf.replace(/\D/g, ""),
          fullName,
          email,
          phoneNumber: phoneNumber.replace(/\D/g, ""),
          specialization: specialization.toUpperCase(),
          institution: institution.toUpperCase(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o formulário");
      }

      alert("Formulário enviado com sucesso!");
      setIsModalOpen(false);
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <img src="/senai-logo.png" alt="Logo" />
        </div>
      </header>

      <nav className="navbar">
        <Button
          label="Sobre o projeto"
          onClick={() => handleButtonClick("Sobre o projeto clicked")}
        />
        <Button label="Inscrições" onClick={() => setIsModalOpen(true)} />
        <Button
          label="Painel ADM"
          onClick={() => handleButtonClick("Painel ADM em desenvolvimento")}
        />
      </nav>

      <section className="banner">
        <img src="/banner.png" alt="Banner" />
      </section>

      <section className="content">
        <div className="slideshow">
          <img src="/slide-1.jfif" alt="Image" />
        </div>
        <div className="text">
          <h1>
            Campanha MS Pela Vida já enviou mais de 50 toneladas de doações ao
            RS e em breve SENAI MS tomará a frente nos reparos de danos
          </h1>
          <p>
            Após uma semana de operação, a campanha MS Pela Vida - Unidos pelo
            Rio Grande do Sul contabiliza números superlativos. Mais de 213 mil
            itens básicos doados pela população sul-mato-grossense abastecem
            caminhões e aeronaves que partem diariamente com destino ao sul do
            país, em socorro às vítimas do maior desastre ambiental em solo
            gaúcho. Mais de 50 toneladas de donativos já foram enviadas ao sul
            do país, em uma ação que contou com o trabalho de 1,5 mil
            voluntários até o momento.
          </p>
          <p>
            O Presidente da FIEMS, Sérgio Longen, comenta os próximos passos da
            campanha: "A catástrofe do Rio Grande do Sul nos traz um alerta para
            o clima. Precisamos entender essa mensagem e avaliar como
            implementar ações que evitem essa realidade em mais ocasiões. Mas
            agora a tarefa de casa brasileiro é atuar em socorro ao Rio Grande
            do Sul, e por este motivo em breve o SENAI tomará a linha de frente
            na luta para reparar os danos nas cidades gaúchas"
          </p>
        </div>
      </section>

      <section className="next-steps-content">
        <div className="text">
          <h1>Próximos passos para reconstruir o RS</h1>
          <p>
            Mais do que arrecadações, é importante oferecer esperança de
            recomeço às famílias que perderam tudo nas enchentes do Rio Grande
            do Sul. Neste sentido, o Sistema Fiems, por meio do Senai, está
            enviando duas unidades móveis para serem enviadas às cidades
            atingidas pelo desastre climático com serviços de eletrotécnica e
            marcenaria.
          </p>
          <p>
            A expectativa é enviar inicialmente uma equipe 26 pessoas, entre
            engenheiros, professores e técnicos.
          </p>
          <p>
            Tem interesse em se voluntariar? Preencha o formulário e se inscreva
            para ajudar as vítimas da maior catástrofe natural do Sul do país.
          </p>
          <Button
            label="Quero participar"
            onClick={() => handleButtonClick("Quero participar clicked")}
          />
        </div>
        <div className="image">
          <img src="/imagem-1.png" alt="Image" />
        </div>
      </section>

      <section className="center-image-section">
        <div className="center-image">
          <img src="/esg.png" alt="Center Image" />
        </div>
      </section>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Inscrição</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>CPF:</label>
            <InputMask
              mask="999.999.999-99"
              value={formData.cpf}
              onChange={handleInputChange}
              name="cpf"
              required
            />
          </div>
          <div>
            <label>Nome completo:</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              name="fullName"
              required
            />
          </div>
          <div>
            <label>E-mail:</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              required
            />
          </div>
          <div>
            <label>Celular:</label>
            <InputMask
              mask="(99) 99999-9999"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
              required
            />
          </div>
          <div>
            <label>Especialização:</label>
            <select
              value={formData.specialization}
              onChange={handleInputChange}
              name="specialization"
              required
            >
              <option value="">Selecione</option>
              <option value="PROFESSOR">Professor</option>
              <option value="TECNICO">Técnico</option>
              <option value="ENGENHEIRO">Engenheiro</option>
            </select>
          </div>
          <div>
            <label>Casa:</label>
            <select
              value={formData.institution}
              onChange={handleInputChange}
              name="institution"
              required
            >
              <option value="">Selecione</option>
              <option value="FIEMS">FIEMS</option>
              <option value="SESI">SESI</option>
              <option value="IEL">IEL</option>
              <option value="SENAI">SENAI</option>
            </select>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </Modal>

      <footer className="footer">
        <div className="footer">
          <img src="/senai-logo.png" alt="Logo" />
        </div>
      </footer>
    </div>
  );
};

export default Home;
