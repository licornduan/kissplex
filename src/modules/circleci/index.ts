import fetch from 'isomorphic-unfetch'

const CIRCLECI_TOKEN = process.env.CIRCLECI_TOKEN as string

type PipelineResponse = {
  id: any;
}

type PipelineParams = {
  storefront: string;
}

export const CircleCISDK = {
  pipelines: {
    deployMetaplex: async ({ storefront }: PipelineParams):Promise<PipelineResponse> => {
      const response = await fetch(
        'https://circleci.com/api/v2/project/gh/holaplex/holaplex-builder/pipeline ',
        {
          method: 'POST',
          headers: {
            'Circle-Token': CIRCLECI_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            branch: "ipfs-hosted-storefronts",
            parameters: {
              storefront,
              run_deploy_metaplex: true,
            }
          })
        }
      )

      const json = await response.json()

      return json
    },
  }
}
