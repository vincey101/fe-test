// import React, { useState } from 'react';
// import { Stepper, rem } from '@mantine/core';
// import { RadiobuttonIcon } from '@radix-ui/react-icons'


// function Step() {
//     const [active, setActive] = useState(1);

//     return (
//         <Stepper color='green' size='xs' active={active} onStepClick={setActive} orientation="vertical">
//             <Stepper.Step label="Step 1" />
//             <Stepper.Step label="Step 2" />
//             <Stepper.Step label="Step 3" />
//         </Stepper>
//     );
// }

// export default Step;


import { useState } from "react";
import { Stepper, Button, Group, MantineProvider } from "@mantine/core";

function Demo() {
    const [active, setActive] = useState(1);
    const nextStep = () =>
        setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <MantineProvider>
                <Stepper
                    active={active}
                    onStepClick={setActive}
                    breakpoint="sm"
                    orientation="vertical"
                    size="xs"
                    color="teal"
                    allowNextStepsSelect={false}
                >
                    <Stepper.Step label="Create Account" description="Create an account">
                        Create an account
                    </Stepper.Step>
                    <Stepper.Step label="Second step" description="Verify email">
                        Step 2 content: Verify email
                    </Stepper.Step>
                    <Stepper.Step label="Second step" description="Verify email">
                        Step 2 content: Verify email
                    </Stepper.Step>
                    <Stepper.Step label="Final step" description="Get full access">
                        Step 3 content: Get full access
                    </Stepper.Step>
                    <Stepper.Completed>
                        Completed, click back button to get to previous step
                    </Stepper.Completed>
                </Stepper>

                <Group position="center" mt="xl">
                    <Button variant="default" color="teal" onClick={prevStep}>
                        Back
                    </Button>
                    <Button color="teal" onClick={nextStep}>
                        Continue
                    </Button>
                </Group>
            </MantineProvider>
        </>
    );
}

export default Demo;
