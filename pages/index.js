import { Toolbar } from '../components/toolbar';

import Head from 'next/head';

import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<>
			<Head>
				<title>Home - News App </title>
			</Head>
			<div className='page-container'>
				<Toolbar />
				<div className={styles.main}>
					<h1>Next.js News App</h1>

					<h3>Your one stop shop fr the latest news articles</h3>
				</div>
			</div>
		</>
	);
}
