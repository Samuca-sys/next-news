import { Toolbar } from '../../components/toolbar';

import { useRouter } from 'next/router';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { newsApi } from '../../services/api';

import styles from '../../styles/Feed.module.css';

export const Feed = ({ pageNumber, articles }) => {
	const router = useRouter();
	return (
		<div className='page-container'>
			<div className={styles.main}>
				<Toolbar />
				{articles.map((article, index) => {
					return (
						<div
							key={index}
							className={styles.post}
							onClick={() => (window.location.href = article.url)}
						>
							<h1>{article.title}</h1>
							<p>{article.description}</p>
							{!!article.urlToImage && (
								<img src={article.urlToImage} alt={article.title} />
							)}
						</div>
					);
				})}
			</div>

			<div className={styles.paginator}>
				<div
					onClick={() => {
						if (pageNumber > 1) {
							router
								.push(`/feed/${pageNumber - 1}`)
								.then(() => window.scrollTo(0, 0));
						}
					}}
					className={pageNumber === 1 ? styles.disabled : styles.active}
				>
					Previous Page
				</div>
				<div>#{pageNumber}</div>
				<div
					onClick={() => {
						if (pageNumber < 5) {
							router
								.push(`/feed/${pageNumber + 1}`)
								.then(() => window.scrollTo(0, 0));
						}
					}}
					className={pageNumber === 5 ? styles.disabled : styles.active}
				>
					Next Page
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async (pageContext) => {
	const pageNumber = pageContext.query.pageId;

	if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
		return {
			props: {
				articles: [],
				pageNumber: 1,
			},
		};
	}

	const { data } = await newsApi.get('top-headlines?', {
		params: {
			country: 'us',
			from: format(new Date(), 'yyyy-MM-dd', { locale: ptBR }),
			sortBy: 'popularity',
			pageSize: 5,
			page: pageNumber,
		},
	});

	return {
		props: {
			articles: data.articles,
			pageNumber: Number.parseInt(pageNumber),
		},
	};
};

export default Feed;
