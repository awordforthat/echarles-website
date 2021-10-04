import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Title</title>
        <meta name="description" content="Emily Charles - personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>This is my website!</h1>

        <p className={styles.description}>TODO: add some stuff</p>
      </main>

      <footer className={styles.footer}>
        <p>Footer goes here</p>
      </footer>
    </div>
  );
};

export default Home;
