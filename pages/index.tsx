// framework
import type { NextPage } from 'next';
import Head from 'next/head';

// components
import { Link as ThemedLink } from '../ui/link';

// styles
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Oh hi!</title>
        <meta name="description" content="Emily Charles - personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section id="greeting">
          <h1 className={styles.title}>Hi, I'm Emily!</h1>
          <h2 className={styles.subtitle}>
            Software engineer, serial dabbler, language enthusiast
          </h2>
        </section>

        <section id="about-me" className={styles.about}>
          <h2>About Me</h2>
          <div>
            I'm a software engineer, and I love working on projects that merge
            the physical world and the virtual world. Currently I work at{' '}
            <ThemedLink text={'Box Fort'} target={'http://www.boxfort.com'} />,
            where I was part of the dev team that built{' '}
            <ThemedLink text={'Level99'} target={'http://www.level99.com'} />, a
            new live-action video game concept that I adore.
          </div>
          <div>
            In the past, I've worked on many museum interactives (maybe some
            you've seen!).
          </div>
          <div>
            I enjoy sharing knowledge, and I'm dedicated to creating and
            participating in spaces that foster open communication around
            technical subjects.
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div id="construction" className={styles.center}>
          This site is perpetually under construction. (I'm currently using it
          to learn Next.JS, very exciting.) Please forgive any rough edges!
        </div>
        <ul>
          <li>
            <ThemedLink
              text="Contact"
              target="mailto:hello@emilywcharles.com"
            />
          </li>
          <li>
            <ThemedLink
              text="Resume"
              target="/ECharlesResume.pdf"
              download={true}
            />
          </li>
          <li>
            <ThemedLink
              text="Woodworking"
              target="https://www.etsy.com/shop/birdsongwoodwork"
            />
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
