import React from 'react';

export default function Hero() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center bg-cover bg-center text-white h-[32rem] mb-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488992783499-418eb1f62d08?q=80&w=3389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                <h1 className="text-8xl font-bold mb-4 border-4 black">TAKE CONTROL OF YOUR KITCHEN</h1>
                <p className="text-center text-2xl">Some description about our website. Blah blah blah.</p>
            </div>
            <div className="bg-white p-8">
                <p>Your normal text goes here.</p>
            </div>
        </div>
    );
}