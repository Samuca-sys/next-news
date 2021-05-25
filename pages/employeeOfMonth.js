import { employeesApi } from '../services/api';

import Head from 'next/head';

import styles from '../styles/EOM.module.css';
import { Toolbar } from '../components/toolbar';

export const EmployeeOfMonth = ({ employees }) => {
	return (
		<>
			<Head>
				<title>Employee Of The Month - News App</title>
				<meta
					name='description'
					content={`This month's employee of the month is ${employees[0].name}`}
				/>

				<meta property='og:image' content={employees.image} />
				<meta property='og:title' content='Employee Of The Month' />
				<meta
					property='og:description'
					content={`This month's employee of the month is ${employees[0].name}`}
				/>

				<meta property='twitter:image' content={employees[0].image} />
				<meta property='twitter:title' content='Employee Of The Month' />
				<meta
					property='twitter:description'
					content={`This month's employee of the month is ${employees[0].name}`}
				/>
			</Head>

			<div className='page-container'>
				<Toolbar />
				<div className={styles.main}>
					<h1>Employee Of The Month</h1>
					{employees.map((employee) => {
						return (
							<div key={employee.name} className={styles.employeeOfTheMonth}>
								<h3>{employee.name}</h3>
								<h6>{employee.position}</h6>
								<img src={employee.image} alt={employee.name} />
								<p>{employee.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

//asynchronous function
export const getServerSideProps = async () => {
	// get api data
	const { data } = await employeesApi.get('employee');

	const employees = data.map((employee) => {
		return {
			name: employee.name,
			position: employee.position,
			description: employee.description,
			image: employee.image,
		};
	});

	// return props object
	return {
		props: {
			employees,
		},
	};
};

export default EmployeeOfMonth;
