import {apiFetch} from "@/api/api.ts";
import type {CreatePortfolioType} from "@/types/createPortfolioType.ts";
import type {PortfolioType} from "@/types/portfolioType.ts";

export async function getPortolioApi() : Promise<PortfolioType>{
    return await apiFetch(`/portfolio`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
}

export async function getPortfolioByIdApi(id: number){
  return await apiFetch(`/portfolio/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export async function createPortfolioApi(portfolio: CreatePortfolioType){
  return await apiFetch(`/portfolio`, {
    method: 'POST',
    body: JSON.stringify({
      portfolio
    }),
    headers: {
      Authorization: `BEARER ${localStorage.getItem('token')}`
    }
  })
}

export async function updatePortfolioByIdApi(id: number, portfolio: PortfolioType){
  return await apiFetch(`/portfolio/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export async function deletePortfolioApi(id: number){
  return await apiFetch(`/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}
