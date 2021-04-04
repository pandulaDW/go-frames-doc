import Head from "next/head";
import { GetStaticProps } from "next";
import { gql, request } from "graphql-request";
import { PersonCollection } from "../models/Person";

interface Props {
  collection: PersonCollection["personCollection"]["items"];
}

export default function Home(props: Props) {
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
}

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

  const { GQL_BASE_URL, CMS_SPACE_ID, CMS_API_KEY } = process.env;
  const url = `https://${GQL_BASE_URL}/v1/spaces/${CMS_SPACE_ID}?access_token=${CMS_API_KEY}`;
  const { personCollection } = await request<PersonCollection>(url, query);

  return {
    props: { collection: personCollection.items },
  };
};
