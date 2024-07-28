"use client"
import Breadcrumb from '@/components/Breadcrumbs';
import DefaultLayout from '@/components/dashboardLayout'
import Proposals from '@/components/list/proposal'
import ProposalModal from '@/components/modal/ProposalModal';
import axios from 'axios';
import React, {  useEffect, useState } from 'react'

export default function ProposalPage() {
    const [proposals, setProposals] = useState({data:[],error:null, loading:true});
    const [proposal, setProposal] = useState(null);
    const [isopenProposal, setIsOpenProposal] = useState(false);
    useEffect(()=>{
       ;(async()=>{
           try{
            const res = await axios.get('/api/proposals');
            setProposals((prev) =>({...prev, data: res.data.data , loading:false}))
           }catch(error){
            setProposals((prev) =>({...prev, error, loading:false}))
           }
       })()
    },[])
    const fieldPermission = ['amount'];
    return (
        <div>
            <DefaultLayout>
                {isopenProposal && <ProposalModal
                    req={'update'}
                    fieldPermission={fieldPermission}
                    isopenProposal={isopenProposal}
                    setIsOpenProposal={setIsOpenProposal}
                    setProposals={setProposals}
                    proposals={proposals}
                    proposal={proposal}
                />}
                <Breadcrumb pageName="Proposals" />
                <Proposals
                    setIsOpenProposal={setIsOpenProposal}
                    proposals={proposals}
                    setProposal={setProposal}
                />
            </DefaultLayout>
        </div>
    )
}
