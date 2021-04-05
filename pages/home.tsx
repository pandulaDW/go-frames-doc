import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { gql } from "graphql-request";
import { PersonCollection } from "../models/Person";
import { graphqlRequest } from "../helpers/apiCalls";

interface Props {
  collection: PersonCollection["personCollection"]["items"];
}

const Home: React.FC<Props> = (props) => {
  if (!props.collection) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Head>
        <title>TS-Contentful</title>
      </Head>
      <ul>
        {props.collection.map((person) => (
          <li key={person.sys.id}>
            {person.name} is of {person.age} years old.
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    {
      personCollection {
        items {
          name
          age
          sys {
            id
          }
        }
      }
    }
  `;

  const { personCollection } = await graphqlRequest<PersonCollection>(query);

  return {
    props: { collection: personCollection.items },
  };
};

export default Home;
