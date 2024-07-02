"use client"
import Breadcrumb from '@/components/Breadcrumbs';
import DefaultLayout from '@/components/dashboardLayout'
import Proposals from '@/components/list/proposal'
import ProposalModal from '@/components/modal/ProposalModal';
import axios from 'axios';
import React, {  useEffect, useState } from 'react'

export default function ProposalPage() {
    const [proposals, setProposals] = useState([]);
    const [proposal, setProposal] = useState(null);
    const [isopenProposal, setIsOpenProposal] = useState(false);
    useEffect(()=>{
       ;(async()=>{
            const res = await axios.get('/api/proposals');
            setProposals(res.data.data)
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
