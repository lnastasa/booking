package org.lucia.gateway;

import com.nexmo.client.NexmoClient;
import com.nexmo.client.auth.TokenAuthMethod;
import com.nexmo.client.sms.SmsSubmissionResult;
import com.nexmo.client.sms.messages.TextMessage;
import org.springframework.stereotype.Component;

@Component
public class SmsGateway {

    private NexmoClient client;

    public SmsGateway() {
        client = new NexmoClient(new TokenAuthMethod("1998d920", "Z8r8Lqed4fSFsMBa"));
    }

    public boolean sendSms(String phoneNumber, String message) {
        try {
            SmsSubmissionResult[] responses = client.getSmsClient().submitMessage(
                    new TextMessage(
                            "PMDC",
                            phoneNumber,
                            message
                    )
            );

            for (SmsSubmissionResult response : responses) {
                System.out.println(response);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
