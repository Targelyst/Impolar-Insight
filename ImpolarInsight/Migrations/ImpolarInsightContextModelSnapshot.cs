﻿// <auto-generated />
using System;
using ImpolarInsight.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ImpolarInsight.Migrations
{
    [DbContext(typeof(ImpolarInsightContext))]
    partial class ImpolarInsightContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ImpolarInsight.Models.Board", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Display")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("TenantId")
                        .HasColumnType("uuid");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("ViewVoters")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("TenantId");

                    b.ToTable("Boards");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Comment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("ActivityId")
                        .HasColumnType("uuid");

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsEdited")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsInternal")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsSpam")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("ParentId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("TenantId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("ActivityId")
                        .IsUnique();

                    b.HasIndex("ParentId");

                    b.HasIndex("TenantId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Post", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("BoardId")
                        .HasColumnType("uuid");

                    b.Property<string>("ContentMarkdown")
                        .HasColumnType("text");

                    b.Property<Guid?>("RoadmapId")
                        .HasColumnType("uuid");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SlugId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("TenantId")
                        .HasColumnType("uuid");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("BoardId");

                    b.HasIndex("RoadmapId");

                    b.HasIndex("TenantId");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("ImpolarInsight.Models.PostActivity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("AuthorId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("CommentId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("TenantId")
                        .HasColumnType("uuid");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("PostId");

                    b.HasIndex("TenantId");

                    b.ToTable("PostActivities");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Roadmap", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Display")
                        .HasColumnType("boolean");

                    b.Property<int>("Index")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("RoadmapCollectionId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("TenantId")
                        .HasColumnType("uuid");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoadmapCollectionId");

                    b.HasIndex("TenantId");

                    b.ToTable("Roadmaps");
                });

            modelBuilder.Entity("ImpolarInsight.Models.RoadmapCollection", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("Display")
                        .HasColumnType("boolean");

                    b.Property<int>("Index")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("TenantId")
                        .HasColumnType("uuid");

                    b.Property<bool>("isPublic")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("TenantId");

                    b.ToTable("RoadmapCollections");
                });

            modelBuilder.Entity("ImpolarInsight.Models.SiteSettings", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AccentColor")
                        .HasColumnType("text");

                    b.Property<bool>("AllowSignup")
                        .HasColumnType("boolean");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("DeveloperMode")
                        .HasColumnType("boolean");

                    b.Property<string>("GoogleAnalyticsId")
                        .HasColumnType("text");

                    b.Property<string>("Icon")
                        .HasColumnType("text");

                    b.Property<bool>("IsPoweredBy")
                        .HasColumnType("boolean");

                    b.Property<string>("Labs")
                        .IsRequired()
                        .HasColumnType("jsonb");

                    b.Property<string>("Logo")
                        .HasColumnType("text");

                    b.Property<Guid>("TenantId")
                        .HasColumnType("uuid");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("TenantId");

                    b.ToTable("SiteSettings");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Tenant", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Domain")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Domain")
                        .IsUnique();

                    b.ToTable("Tenants");
                });

            modelBuilder.Entity("ImpolarInsight.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Avatar")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsBlocked")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsOwner")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Notes")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("TenantId")
                        .HasColumnType("uuid");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("TenantId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Vote", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("TenantId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("TenantId");

                    b.HasIndex("UserId");

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Board", b =>
                {
                    b.HasOne("ImpolarInsight.Models.Tenant", "Tenant")
                        .WithMany("Boards")
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tenant");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Comment", b =>
                {
                    b.HasOne("ImpolarInsight.Models.PostActivity", "Activity")
                        .WithOne("Comment")
                        .HasForeignKey("ImpolarInsight.Models.Comment", "ActivityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ImpolarInsight.Models.Comment", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ImpolarInsight.Models.Tenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Activity");

                    b.Navigation("Parent");

                    b.Navigation("Tenant");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Post", b =>
                {
                    b.HasOne("ImpolarInsight.Models.Board", "Board")
                        .WithMany("Posts")
                        .HasForeignKey("BoardId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("ImpolarInsight.Models.Roadmap", "Roadmap")
                        .WithMany("Posts")
                        .HasForeignKey("RoadmapId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("ImpolarInsight.Models.Tenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ImpolarInsight.Models.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Board");

                    b.Navigation("Roadmap");

                    b.Navigation("Tenant");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ImpolarInsight.Models.PostActivity", b =>
                {
                    b.HasOne("ImpolarInsight.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ImpolarInsight.Models.Post", "Post")
                        .WithMany("Activities")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ImpolarInsight.Models.Tenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Post");

                    b.Navigation("Tenant");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Roadmap", b =>
                {
                    b.HasOne("ImpolarInsight.Models.RoadmapCollection", "RoadmapCollection")
                        .WithMany("Roadmaps")
                        .HasForeignKey("RoadmapCollectionId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("ImpolarInsight.Models.Tenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RoadmapCollection");

                    b.Navigation("Tenant");
                });

            modelBuilder.Entity("ImpolarInsight.Models.RoadmapCollection", b =>
                {
                    b.HasOne("ImpolarInsight.Models.Tenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tenant");
                });

            modelBuilder.Entity("ImpolarInsight.Models.SiteSettings", b =>
                {
                    b.HasOne("ImpolarInsight.Models.Tenant", "Tenant")
                        .WithMany("SiteSettings")
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tenant");
                });

            modelBuilder.Entity("ImpolarInsight.Models.User", b =>
                {
                    b.HasOne("ImpolarInsight.Models.Tenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tenant");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Vote", b =>
                {
                    b.HasOne("ImpolarInsight.Models.Post", "Post")
                        .WithMany("Votes")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ImpolarInsight.Models.Tenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ImpolarInsight.Models.User", "User")
                        .WithMany("Votes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("Tenant");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Board", b =>
                {
                    b.Navigation("Posts");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Post", b =>
                {
                    b.Navigation("Activities");

                    b.Navigation("Votes");
                });

            modelBuilder.Entity("ImpolarInsight.Models.PostActivity", b =>
                {
                    b.Navigation("Comment");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Roadmap", b =>
                {
                    b.Navigation("Posts");
                });

            modelBuilder.Entity("ImpolarInsight.Models.RoadmapCollection", b =>
                {
                    b.Navigation("Roadmaps");
                });

            modelBuilder.Entity("ImpolarInsight.Models.Tenant", b =>
                {
                    b.Navigation("Boards");

                    b.Navigation("SiteSettings");
                });

            modelBuilder.Entity("ImpolarInsight.Models.User", b =>
                {
                    b.Navigation("Posts");

                    b.Navigation("Votes");
                });
#pragma warning restore 612, 618
        }
    }
}
