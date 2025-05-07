import * as React from 'react';
import { Body, Container, Section, Tailwind, Text } from "@react-email/components";



export default function OTPEmail({ otp }) {
  return (
    <Tailwind>
      <Body>
        <Container>
            <Section>
              <Text>Hello, </Text>
                <Text className='font-medium'>Use the following One Time Password (OTP) to complete your action:</Text>
                <Text className='text-xl font-extrabold bg-gray-200 rounded-xl p-4 text-center'>
                  {otp}
                </Text>
                <Text>This code expires in <span className='font-bold'>10 minutes</span>. <span className='font-bold'>Do not share it with anyone.</span></Text>
                <Text><i>If you didn&apos;t request this OTP, you can safely ignore this email.</i></Text>
                <Text>Thanks,<br/>
                <span className='font-bold'>EMRMS</span> Team</Text>
            </Section>
        </Container>
      </Body>
    </Tailwind>
  );
}
