import React from 'react';
import { RepositoryListContainer } from "../../components/RepositoryList";
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                pageInfo: {
                    totalCount: 8,
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };

            // Add your test code here
            const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
            const testedComponents = {
                name: getAllByTestId('repositoryName'),
                description: getAllByTestId('repositoryDescription'),
                language: getAllByTestId('repositoryLanguage'),
                stars: getAllByTestId('repositoryStars'),
                forks: getAllByTestId('repositoryForks'),
                reviews: getAllByTestId('repositoryReviews'),
                rating: getAllByTestId('repositoryRating'),
            };
            const autoValue = (value) => value >= 1000 ? (value / 1000).toFixed(1).toString() + 'k' : value;
            repositories.edges.forEach((repository, i) => {
                expect(testedComponents.name[i]).toHaveTextContent(repository.node.fullName);
                expect(testedComponents.description[i]).toHaveTextContent(repository.node.description);
                expect(testedComponents.language[i]).toHaveTextContent(repository.node.language);
                expect(testedComponents.stars[i]).toHaveTextContent(autoValue(repository.node.stargazersCount));
                expect(testedComponents.forks[i]).toHaveTextContent(autoValue(repository.node.forksCount));
                expect(testedComponents.reviews[i]).toHaveTextContent(autoValue(repository.node.reviewCount));
                expect(testedComponents.rating[i]).toHaveTextContent(autoValue(repository.node.ratingAverage));
            });
        });
    });
});