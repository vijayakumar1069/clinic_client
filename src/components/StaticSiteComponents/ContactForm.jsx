"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import useAccessToken from "@/app/hooks/useAccessToken";
import useFetch from "@/app/hooks/useFetch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { contactSchema } from "@/lib/schema/contactFormSchema";
import { timeSlots } from "@/lib/consts/doctorConsts";

const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      doctor: "",
      date: null,
      timing: "",
    },
  });

  const { token } = useAccessToken();
  const { loading, fetchData, error, success } = useFetch();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      const res = await fetchData("/api/all-doctors", "GET", null, null, false);
      if (res.success) {
        console.log(res.data);
        setDoctors(res.data);
      } else {
        toast.error(res.error);
      }
    };
    getDoctors();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Format the date for submission
      const formattedData = {
        ...data,
        date: format(data.date, "yyyy-MM-dd"),
      };
      console.log(formattedData);

      const res = await fetchData(
        `/api/book-an-appointmet`,
        "POST",
        formattedData,
        null,
        false
      );
      console.log(res);
      if (res.success) {
        if (res.success) {
          form.reset({
            name: "",
            email: "",
            mobile: "",
            doctor: "",
            date: null,
            timing: "",
          });

          toast.success("Appointment booked successfully!");
        }
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(error);
    }
  };

  return (
    <div className="md:w-1/2 md:pl-12">
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-semibold mb-6">Book An Appointment</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="border-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className="border-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Mobile number"
                      {...field}
                      className="border-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Doctor</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-primary focus:border-primary">
                        <SelectValue placeholder="Choose a doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem
                          key={doctor.id || doctor._id}
                          value={doctor.id || doctor._id}
                        >
                          {doctor.name ||
                            `${doctor.firstName} ${doctor.lastName}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal border-primary focus:border-primary",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Time</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-primary focus:border-primary">
                        <SelectValue placeholder="Choose a time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />

            <div>
              <Button className="w-full text-white" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
