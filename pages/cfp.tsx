import { lazy, Suspense } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";

import {
  CfpQueryDocument,
  CfpQueryQuery,
  CfpQueryQueryVariables,
} from "../src/graphql/cfp.generated";
import { urlQlient } from "../src/graphql/urql";
import { ParseQuery } from "../src/helpers/types";
import Seo from "../src/Components/Seo";

const NavBar = dynamic(() => import("../src/Components/NavBar/NavBar"), {
  ssr: false,
});
const BannerCFP = lazy(() => import("../src/Components/Banner/CFP"));

type Page = ParseQuery<CfpQueryQuery["page"]>;

export type PageProps = {
  navData: Page["navBar"];
  heroData: Page["heroBlock"];
  seo: Page["seo"];
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 1440px;
  min-height: 100vh;
`;
const StyledBlackWrapp = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.elements.global.backgroundColor};
`;

const OnSitePage: NextPage<PageProps> = (props) => {
  return (
    <StyledBlackWrapp>
      <Seo {...props.seo} />
      <Container>
        {props.navData && (
          <Suspense fallback={null}>
            <NavBar {...props.navData} />
          </Suspense>
        )}
        {props.heroData && (
          <Suspense fallback={null}>
            <BannerCFP {...props.heroData} />
          </Suspense>
        )}
      </Container>
    </StyledBlackWrapp>
  );
};

export async function getStaticProps() {
  const queryResults = await urlQlient
    .query<CfpQueryQuery, CfpQueryQueryVariables>(CfpQueryDocument, {
      id: "1GDpX9fgkG15wZWOYFV4il",
      locale: "es-CL",
      isPreview: Boolean(process.env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW),
    })
    .toPromise();
  const page = queryResults.data?.page as Page;
  if (!page) return { props: {} };
  const props: PageProps = {
    navData: page?.navBar,
    heroData: page?.heroBlock,
    seo: page?.seo,
  };
  return {
    props,
  };
}

export default OnSitePage;
