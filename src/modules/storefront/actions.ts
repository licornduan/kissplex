import React from "react";
import { StorefrontTheme, Storefront } from "./types";
 
export async function checkStorefrontAvailability(subdomain: string, dispatch: React.Dispatch<any>) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

   try {
    const response = await fetch(`/api/storefronts/${subdomain}`, requestOptions);

    if (response.ok) {
      dispatch({
        type: 'UPDATE_SUBDOMAIN_AVAILABILITY',
        payload: {
          available: false,
        },
      })

      return
    }

    dispatch({
      type: 'UPDATE_SUBDOMAIN_AVAILABILITY',
      payload: {
        available: true,
      },
    })

   } catch (error) {
     dispatch({ type: 'UPDATE_SUBDOMAIN_AVAILABILITY', payload: { error }})
   }

}
export async function createStorefront(subdomain: string, dispatch: React.Dispatch<any>) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subdomain })
  };
  try {
    const response = await fetch(`/api/storefronts`, requestOptions);
    const data = await response.json()

    if (data.subdomain) {
      dispatch({
        type: 'STOREFRONT_SAVED',
        payload: {
          ...data
        },
      })
    }
    return;

   } catch (error) {
     dispatch({ type: 'STOREFRONT_SAVE_ERROR', payload: { error }})
   }


}

export async function uploadLogo(
  logo: any,
  subdomain: string,
  dispatch: React.Dispatch<any>,
) {
  const formData = new FormData();

  formData.append('file', logo);
  const response = await fetch(`/api/storefronts/${subdomain}/uploads`, {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const { url } = await response.json()
    dispatch({ type: 'LOGO_UPDATED', payload: { logoUrl: url } })
  }
}
 
export async function saveTheme(
    theme: StorefrontTheme,
    storefront: Storefront,
    dispatch: React.Dispatch<any>
  ) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ theme })
  };
  try {
    const response = await fetch(`/api/storefronts/${storefront.subdomain}`, requestOptions);
    const data = await response.json()

    if (data.theme) {
      dispatch({
        type: 'THEME_SAVED',
        payload: {
          ...data.theme
        },
      })
    }
    return;

   } catch (error) {
     dispatch({ type: 'THEME_SAVE_ERROR', payload: { error }})
   }
}

export async function savePubkey(
    subdomain: string,
    pubkey: string,
    dispatch: React.Dispatch<any>
  ) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pubkey })
  };
  try {
    const response = await fetch(`/api/storefronts/${subdomain}`, requestOptions);
    const  data = await response.json()

    dispatch({
      type: 'PUBKEY_SAVED',
      payload: data,
    })
   } catch (error) {
     dispatch({ type: 'PUBKEY_SAVE_ERROR', payload: { error }})
   }
}