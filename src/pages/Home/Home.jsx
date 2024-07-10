import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

  const validationSchema = Yup.object({
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
      .required("CPF é obrigatório"),
    fullName: Yup.string().required("Nome completo é obrigatório"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    phoneNumber: Yup.string().required("Celular é obrigatório"),
    specialization: Yup.string().required("Especialização é obrigatória"),
    institution: Yup.string().required("Casa é obrigatória"),
  });

  const handleButtonClick = (message) => {
    alert(message);
  };

  const handleFormSubmit = async (values) => {
    const { cpf, fullName, email, phoneNumber, specialization, institution } =
      values;

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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="Modal"
      >
        <h2>Formulário de Inscrição de Voluntário na Campanha MS Pela Vida</h2>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          <Form>
            {/* CPF */}
            <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
              <Field name="cpf" as={InputMask} mask="999.999.999-99" />
              <ErrorMessage name="cpf">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Nome Completo */}
            <div className="form-group">
              <label htmlFor="fullName">Nome completo:</label>
              <Field type="text" name="fullName" />
              <ErrorMessage name="fullName">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* E-mail */}
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Celular */}
            <div className="form-group">
              <label htmlFor="phoneNumber">Celular:</label>
              <Field name="phoneNumber" as={InputMask} mask="(99) 99999-9999" />
              <ErrorMessage name="phoneNumber">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Especialização */}
            <div className="form-group">
              <label htmlFor="specialization">Especialização:</label>
              <Field as="select" name="specialization">
                <option value="">Selecione</option>
                <option value="PROFESSOR">Professor</option>
                <option value="TECNICO">Técnico</option>
                <option value="ENGENHEIRO">Engenheiro</option>
              </Field>
              <ErrorMessage name="specialization">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Casa */}
            <div className="form-group">
              <label htmlFor="institution">Casa:</label>
              <Field as="select" name="institution">
                <option value="">Selecione</option>
                <option value="FIEMS">FIEMS</option>
                <option value="SESI">SESI</option>
                <option value="IEL">IEL</option>
                <option value="SENAI">SENAI</option>
              </Field>
              <ErrorMessage name="institution">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>

            <button type="submit">REALIZAR INSCRIÇÃO</button>
          </Form>
        </Formik>
      </Modal>

      <header className="header">
        <div className="logo">
          <img src="/senai-logo.png" alt="Logo" />
        </div>
      </header>

      <nav className="navbar">
        <Button
          label="Sobre o projeto"
          onClick={() =>
            handleButtonClick("Sobre o projeto em desenvolvimento")
          }
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
            onClick={() => setIsModalOpen(true)}
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

      <footer className="footer">
        <div className="footer">
          <img src="/senai-logo.png" alt="Logo" />
        </div>
      </footer>
    </div>
  );
};

export default Home;
