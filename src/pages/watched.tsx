import * as React from "react";
import Navbar from "../components/layouts/navbar";
import { Container } from "../components/layouts/container";
import Card from "../components/ui/card";
import { Typography } from "../components/ui/typography";

const Watched = () => {
  return (
    <Container>
      <Navbar />
      <Typography variant="h2" className="text-white">Watched List</Typography>
      <section className="grid-cols-1 px-3 grid gap-5 md:grid-cols-4 sm:grid-cols-2 md:px-0">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </Container>
  );
};

export default Watched;
