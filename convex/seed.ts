import { internalMutation } from "./_generated/server";

export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existingSettings = await ctx.db.query("siteSettings").first();
    if (!existingSettings) {
      await ctx.db.insert("siteSettings", {
        orgName: "SaveCat Africa",
        tagline:
          "Protecting Africa's felines with compassion, medical excellence, and community-driven solutions.",
        contactEmail: "info@savecatafrica.org",
        contactAddress: "Nairobi, Kenya",
        contactHours: "Mon - Fri, 9am - 5pm EAT",
        monthlyGoalCents: 2500000,
        foundedYear: "2012",
        registrationNumber: "",
        nationsCount: 14,
        impactIntro:
          "In Africa, every contribution is monumental. Because of our localized operation model, small gifts from abroad create dramatic shifts in animal welfare infrastructure.",
        impactQuote:
          "Our mission is simple: to ensure no cat suffers in silence. Every contribution brings us closer to a continent where animal welfare is a standard, not a luxury.",
        donationSidebarNote:
          "Every dollar provides food and clean water to our rescue centers.",
        crisisBadge: "Emergency Response Active",
        crisisTitle: "The Silent Crisis",
        crisisSubtitle:
          "Supporting local communities with veterinary care, education, and rescue infrastructure to ensure the safety of feral and domestic felines.",
        protectionEyebrow: "The Protection Plan",
        protectionTitle: "Building Resilience for Africa's Felines",
        heroBadge: "Emergency Response Active",
        heroHeadline: "Protecting Domestic",
        heroHeadlineAccent: "Cats Across Africa",
        heroSubcopy:
          "Millions of domestic cats in Africa suffer from neglect, abuse, superstition, and lack of veterinary care. They face a unique and devastating set of challenges that most people rarely consider.",
        heroImageUrl:
          "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&q=80&w=2000",
        donationImageUrl:
          "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=2000",
        trustStripText:
          "Secure Stripe checkout • Transparent impact • Registered nonprofit",
        siteDescription:
          "SaveCat Africa protects domestic cats across Africa through mobile clinics, rescue, and community education.",
        monthlyGivingEnabled: true,
        showTrustStrip: true,
        showStories: true,
        showTestimonials: true,
        showFaq: true,
        showGallery: true,
        showRecentDonors: true,
      });
    }

    const crisisCount = (await ctx.db.query("crisisCards").collect()).length;
    if (crisisCount === 0) {
      const cards = [
        {
          title: "Rampant Disease",
          description:
            "Rabies and feline distemper decimate local populations, posing risks to both wildlife and human communities.",
          icon: "HeartPulse",
          sortOrder: 0,
        },
        {
          title: "Severe Malnutrition",
          description:
            "Resource scarcity leads to chronic hunger, leaving cats vulnerable to secondary infections and premature death.",
          icon: "Utensils",
          sortOrder: 1,
        },
        {
          title: "Lack of Stewardship",
          description:
            "A lack of veterinary infrastructure and education leads to overpopulation and cycles of abandonment in growing cities.",
          icon: "Users",
          sortOrder: 2,
        },
      ];
      for (const card of cards) {
        await ctx.db.insert("crisisCards", card);
      }
    }

    const planCount = (await ctx.db.query("protectionPlans").collect()).length;
    if (planCount === 0) {
      const plans = [
        {
          planId: "01",
          title: "Mobile Clinics",
          description:
            "Bringing emergency medical care and vaccinations directly to remote villages.",
          icon: "Truck",
          sortOrder: 0,
        },
        {
          planId: "02",
          title: "Sterilization (TNR)",
          description:
            "Humane population control through Trap-Neuter-Return programs in urban areas.",
          icon: "Microscope",
          sortOrder: 1,
        },
        {
          planId: "03",
          title: "Sanctuary Care",
          description:
            "Safe havens for cats that cannot be returned to the streets due to injury or illness.",
          icon: "Home",
          sortOrder: 2,
        },
        {
          planId: "04",
          title: "Community Education",
          description:
            "Workshops for local pet owners on nutrition and responsible stewardship.",
          icon: "School",
          sortOrder: 3,
        },
        {
          planId: "05",
          title: "Emergency Rescue",
          description:
            "24/7 hotline and dispatch for animals in life-threatening situations.",
          icon: "Flame",
          sortOrder: 4,
        },
        {
          planId: "06",
          title: "Wildlife Integration",
          description:
            "Protecting the ecological balance by managing feline interactions with local wildlife.",
          icon: "Globe",
          sortOrder: 5,
        },
      ];
      for (const plan of plans) {
        await ctx.db.insert("protectionPlans", plan);
      }
    }

    const tierCount = (await ctx.db.query("donationTiers").collect()).length;
    if (tierCount === 0) {
      const tiers = [
        {
          amountCents: 1500,
          label: "Basic Care Supporter",
          description: "Feeds 3 rescued cats for an entire month.",
          popular: false,
          sortOrder: 0,
        },
        {
          amountCents: 5000,
          label: "Medical Hero",
          description:
            "Funds life-saving surgeries for injured stray cats every month.",
          popular: true,
          sortOrder: 1,
        },
        {
          amountCents: 10000,
          label: "Sanctuary Patron",
          description: "Sustains a local community educator's salary for 2 weeks.",
          popular: false,
          sortOrder: 2,
        },
        {
          amountCents: 50000,
          label: "Guardian Circle",
          description: "Sponsors a full week of Mobile Vet Clinic operations.",
          popular: false,
          sortOrder: 3,
        },
      ];
      for (const tier of tiers) {
        await ctx.db.insert("donationTiers", tier);
      }
    }

    const pageCount = (await ctx.db.query("pages").collect()).length;
    if (pageCount === 0) {
      await ctx.db.insert("pages", {
        slug: "roadmap",
        title: "Full Roadmap",
        body: "## Our Roadmap\n\nWe are building mobile clinics, TNR programs, and sanctuary care across Africa. Check back for updates.",
      });
      await ctx.db.insert("pages", {
        slug: "team",
        title: "Our Team",
        body: "## Our Team\n\nMeet the volunteers and staff driving SaveCat Africa's mission.",
      });
      await ctx.db.insert("pages", {
        slug: "reports",
        title: "Reports",
        body: "## Reports\n\nAnnual impact reports will be published here.",
      });
    }

    const linkCount = (await ctx.db.query("footerLinks").collect()).length;
    if (linkCount === 0) {
      const links = [
        { section: "navigation", label: "Our Mission", href: "#mission", sortOrder: 0 },
        { section: "navigation", label: "Campaigns", href: "#campaigns", sortOrder: 1 },
        { section: "navigation", label: "About", href: "/p/team", sortOrder: 2 },
        { section: "navigation", label: "FAQ", href: "#faq", sortOrder: 3 },
        { section: "navigation", label: "Contact", href: "#contact", sortOrder: 4 },
        {
          section: "transparency",
          label: "Financials",
          href: "/p/reports",
          sortOrder: 0,
        },
        {
          section: "transparency",
          label: "Governance",
          href: "/p/reports",
          sortOrder: 1,
        },
        {
          section: "transparency",
          label: "Annual Report",
          href: "/p/reports",
          sortOrder: 2,
        },
        {
          section: "transparency",
          label: "Contact Us",
          href: "#contact",
          sortOrder: 3,
        },
      ];
      for (const link of links) {
        await ctx.db.insert("footerLinks", link);
      }
    }

    const adminCount = (await ctx.db.query("admins").collect()).length;
    if (adminCount === 0) {
      await ctx.db.insert("admins", {
        email: "admin@savecatafrica.org",
      });
    }

    const settings = await ctx.db.query("siteSettings").first();
    if (settings) {
      await ctx.db.patch(settings._id, {
        trustStripText:
          "Secure Stripe checkout • Transparent impact • Registered nonprofit",
        siteDescription:
          "SaveCat Africa protects domestic cats across Africa through mobile clinics, rescue, and community education.",
        monthlyGivingEnabled: true,
        showTrustStrip: true,
        showStories: true,
        showTestimonials: true,
        showFaq: true,
        showGallery: true,
        showRecentDonors: true,
      });
    }

    if ((await ctx.db.query("campaigns").collect()).length === 0) {
      const campaigns = [
        {
          name: "Mobile Vet Clinics",
          slug: "mobile-clinics",
          description:
            "Fund emergency medical care and vaccinations in remote villages across East Africa.",
          goalCents: 500000,
          imageUrl:
            "https://images.unsplash.com/photo-1628009368182-84a9c4a9b2b8?auto=format&fit=crop&q=80&w=800",
          active: true,
          sortOrder: 0,
        },
        {
          name: "Sanctuary Expansion",
          slug: "sanctuary-expansion",
          description:
            "Help us build safe havens for injured cats that cannot return to the streets.",
          goalCents: 750000,
          imageUrl:
            "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800",
          active: true,
          sortOrder: 1,
        },
        {
          name: "Community Education",
          slug: "community-education",
          description:
            "Sponsor workshops teaching responsible pet stewardship and humane population control.",
          goalCents: 250000,
          imageUrl:
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
          active: true,
          sortOrder: 2,
        },
      ];
      for (const c of campaigns) await ctx.db.insert("campaigns", c);
    }

    if ((await ctx.db.query("rescueStories").collect()).length === 0) {
      const stories = [
        {
          catName: "Malaika",
          title: "From the streets to safety",
          story:
            "Malaika was found starving in Nairobi with a severe leg injury. Your donations funded her surgery and recovery. Today she lives in a foster home awaiting adoption.",
          location: "Nairobi, Kenya",
          amountNeededCents: 5000,
          imageUrl:
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
          featured: true,
          visible: true,
          sortOrder: 0,
        },
        {
          catName: "Simba",
          title: "Vaccinated and thriving",
          story:
            "Simba received a full course of vaccinations through our mobile clinic program — protecting him and the community from rabies.",
          location: "Kampala, Uganda",
          amountNeededCents: 1500,
          imageUrl:
            "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800",
          featured: false,
          visible: true,
          sortOrder: 1,
        },
      ];
      for (const s of stories) await ctx.db.insert("rescueStories", s);
    }

    if ((await ctx.db.query("testimonials").collect()).length === 0) {
      const items = [
        {
          name: "Dr. Amara Okafor",
          role: "Veterinary Partner, Lagos",
          quote:
            "SaveCat Africa brings medical care where no other organization goes. Every donation directly saves lives.",
          visible: true,
          sortOrder: 0,
        },
        {
          name: "James M.",
          role: "Monthly Supporter",
          quote:
            "Knowing my monthly gift feeds and vaccinates rescued cats gives me real peace of mind.",
          visible: true,
          sortOrder: 1,
        },
      ];
      for (const t of items) await ctx.db.insert("testimonials", t);
    }

    if ((await ctx.db.query("faqItems").collect()).length === 0) {
      const faqs = [
        {
          question: "Where does my donation go?",
          answer:
            "100% of program donations fund mobile clinics, rescue operations, food, and veterinary care. Administrative costs are kept minimal.",
          visible: true,
          sortOrder: 0,
        },
        {
          question: "Is my payment secure?",
          answer:
            "Yes. All donations are processed through Stripe, a PCI-compliant payment provider used by millions of organizations worldwide.",
          visible: true,
          sortOrder: 1,
        },
        {
          question: "Can I volunteer?",
          answer:
            "Absolutely. Contact us through the form below or email info@savecatafrica.org to learn about field and remote volunteer opportunities.",
          visible: true,
          sortOrder: 2,
        },
        {
          question: "Can I give monthly?",
          answer:
            "Yes! Toggle 'Give monthly' in the donation widget. Monthly supporters are the backbone of our rescue operations.",
          visible: true,
          sortOrder: 3,
        },
      ];
      for (const f of faqs) await ctx.db.insert("faqItems", f);
    }

    if ((await ctx.db.query("pages").collect()).find((p) => p.slug === "privacy") === undefined) {
      await ctx.db.insert("pages", {
        slug: "privacy",
        title: "Privacy Policy",
        body: "SaveCat Africa respects your privacy. We collect only the information needed to process donations and respond to inquiries. We never sell your data. Contact info@savecatafrica.org with any questions.",
      });
    }

    return { seeded: true };
  },
});
