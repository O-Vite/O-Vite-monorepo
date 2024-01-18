import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  FormHelperText,
} from "@mui/material";
import {
  TextFieldWrapper,
} from "../../components/authentication/StyledComponents";
import FlexBox from "../../components/FlexBox";
import LightTextField from "../../components/LightTextField";
import { Paragraph, Small } from "../../components/Typography";
import { useFormik } from "formik";
import useAuth from "../../hooks/useAuth";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Login: FC = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    submit: null,
    remember: true,
  };
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Veuillez saisir un email valide")
      .max(255)
      .required("Un email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Un mot de passe est requis"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values: any) => {
        setLoading(true);
        login(values.email, values.password)
          .then(() => {
            setLoading(false);
            toast.success("Vous vous êtes connecté avec succès");
            navigate("/dashboard");
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
        },
    });

  const boutonStyle = {
  backgroundColor: 'rgba(83, 120, 163, 1)',
  color: 'white'
};  

  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: { sm: "100%" },
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={1}
        >
          <Box width={270} mb={1}>
            <img src="/static/logo_ovite.svg" width="100%" alt="CuisineConnectLogo" />
          </Box>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="0.5rem">
      
          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Email
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Mot de Passe
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="password"
                  type="password"
                  label="Mot de passe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password || ""}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </TextFieldWrapper>
            </FlexBox>

            <FlexBox mt={2} alignItems="center" justifyContent="space-between">
            </FlexBox>

            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                  Connexion
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained" style={boutonStyle}>
                  Connexion
                </Button>
              )}
            </Box>
          </form>

           <Small margin="auto" mt={3} color="text.disabled">
            Vous n'avez pas encore de compte?{" "}
            <Link to="/inscription">
              <Small color="primary.main">Créer un compte </Small>
            </Link>
          </Small> 
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Login;
