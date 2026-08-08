/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Common_BackInputs */
/** @typedef {{}} Common_NextInputs */
/** @typedef {{}} Common_CancelInputs */
/** @typedef {{}} Common_SaveInputs */
/** @typedef {{}} Common_DeleteInputs */
/** @typedef {{}} Common_RetryInputs */
/** @typedef {{}} Common_ResumeInputs */
/** @typedef {{}} Common_PauseInputs */
/** @typedef {{}} Common_PrevInputs */
/** @typedef {{}} Common_ClearInputs */
/** @typedef {{}} Common_DismissInputs */
/** @typedef {{}} Common_BrowseInputs */
/** @typedef {{}} Common_LoadingInputs */
/** @typedef {{}} Common_SavedInputs */
/** @typedef {{}} Common_SavingInputs */
/** @typedef {{}} Common_DeletingInputs */
/** @typedef {{}} Common_TestingInputs */
/** @typedef {{}} Common_Closedetails1Inputs */
/** @typedef {{ key: NonNullable<unknown> }} Common_Couldnotload2Inputs */
/** @typedef {{ key: NonNullable<unknown> }} Common_Couldnotsave2Inputs */
/** @typedef {{}} Common_Retryfailures1Inputs */
/** @typedef {{}} Nav_ImportInputs */
/** @typedef {{}} Nav_RecipientsInputs */
/** @typedef {{}} Nav_TemplatesInputs */
/** @typedef {{}} Nav_ComposeInputs */
/** @typedef {{}} Nav_LogsInputs */
/** @typedef {{}} Nav_SettingsInputs */
/** @typedef {{}} App_Backendunreachable1Inputs */
/** @typedef {{}} Welcome_TitleInputs */
/** @typedef {{}} Welcome_SubtitleInputs */
/** @typedef {{}} Welcome_Checkinglibreoffice2Inputs */
/** @typedef {{}} Welcome_Libreofficepurpose2Inputs */
/** @typedef {{}} Welcome_Libreofficefound2Inputs */
/** @typedef {{}} Welcome_Libreofficemissing2Inputs */
/** @typedef {{}} Welcome_Libreofficemissingdetail3Inputs */
/** @typedef {{}} Welcome_Installwith1Inputs */
/** @typedef {{}} Welcome_Downloadfrom1Inputs */
/** @typedef {{}} Welcome_Checkagain1Inputs */
/** @typedef {{}} Welcome_Templatesfolder1Inputs */
/** @typedef {{}} Welcome_Outputfolder1Inputs */
/** @typedef {{}} Welcome_Settingup1Inputs */
/** @typedef {{}} Welcome_Getstarted1Inputs */
/** @typedef {{}} Status_PendingInputs */
/** @typedef {{}} Status_SendingInputs */
/** @typedef {{}} Status_PausedInputs */
/** @typedef {{}} Status_CompletedInputs */
/** @typedef {{}} Status_CancelledInputs */
/** @typedef {{}} Status_FailedInputs */
/** @typedef {{}} Status_SkippedInputs */
/** @typedef {{}} Status_SentInputs */
/** @typedef {{}} Settingspage_Title1Inputs */
/** @typedef {{}} Settingspage_Description1Inputs */
/** @typedef {{}} Settingspage_Ratelimiting2Inputs */
/** @typedef {{}} Settingspage_Ratelimitingdescription3Inputs */
/** @typedef {{ ms: NonNullable<unknown> }} Settingspage_Msperemail3Inputs */
/** @typedef {{}} Settingspage_Delaybetweenemails3Inputs */
/** @typedef {{}} Settingspage_Defaultfolders2Inputs */
/** @typedef {{}} Settingspage_Defaultfoldersdescription3Inputs */
/** @typedef {{}} Settingspage_Templatesfolder2Inputs */
/** @typedef {{}} Settingspage_Outputfolder2Inputs */
/** @typedef {{}} Settingspage_About1Inputs */
/** @typedef {{}} Settingspage_App1Inputs */
/** @typedef {{}} Settingspage_Version1Inputs */
/** @typedef {{}} Settingspage_Data1Inputs */
/** @typedef {{}} Settingspage_Storedlocally2Inputs */
/** @typedef {{}} Settingspage_Language1Inputs */
/** @typedef {{}} Settingspage_Languagedescription2Inputs */
/** @typedef {{ rate: NonNullable<unknown> }} Settingspage_Ratepersecondone4Inputs */
/** @typedef {{ rate: NonNullable<unknown> }} Settingspage_Ratepersecondother4Inputs */
/** @typedef {{}} Settingspage_Couldnotload3Inputs */
/** @typedef {{}} Smtp_TitleInputs */
/** @typedef {{}} Smtp_DescriptionInputs */
/** @typedef {{}} Smtp_Addprofile1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Profilesaved1Inputs */
/** @typedef {{}} Smtp_Profiledeleted1Inputs */
/** @typedef {{}} Smtp_Couldnotsaveprofile3Inputs */
/** @typedef {{}} Smtp_Couldnotdeleteprofile3Inputs */
/** @typedef {{}} Smtp_Couldnotloadprofiles3Inputs */
/** @typedef {{}} Smtp_Loadingprofiles1Inputs */
/** @typedef {{}} Smtp_Noprofilesyet2Inputs */
/** @typedef {{}} Smtp_Noprofilesdescription2Inputs */
/** @typedef {{}} Smtp_Testconnection1Inputs */
/** @typedef {{}} Smtp_Connectionok1Inputs */
/** @typedef {{}} Smtp_ConnectedInputs */
/** @typedef {{}} Smtp_Connectionfailed1Inputs */
/** @typedef {{}} Smtp_Passwordnotset2Inputs */
/** @typedef {{}} Smtp_Addprofiletitle2Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Editprofiletitle2Inputs */
/** @typedef {{}} Smtp_Createhint1Inputs */
/** @typedef {{}} Smtp_Edithint1Inputs */
/** @typedef {{}} Smtp_Profilename1Inputs */
/** @typedef {{}} Smtp_Smtphost1Inputs */
/** @typedef {{}} Smtp_PortInputs */
/** @typedef {{}} Smtp_Implicittls1Inputs */
/** @typedef {{}} Smtp_StarttlsInputs */
/** @typedef {{}} Smtp_UsernameInputs */
/** @typedef {{}} Smtp_Apppassword1Inputs */
/** @typedef {{}} Smtp_Leaveblanktokeep3Inputs */
/** @typedef {{}} Smtp_Gmailapppasswordhint3Inputs */
/** @typedef {{}} Smtp_Saveprofile1Inputs */
/** @typedef {{}} Smtp_Savechanges1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Deleteprofiletitle2Inputs */
/** @typedef {{}} Smtp_Deleteprofiledescription2Inputs */
/** @typedef {{}} Smtp_Passwordlabel1Inputs */
/** @typedef {{}} Compose_TitleInputs */
/** @typedef {{}} Compose_DescriptionInputs */
/** @typedef {{}} Compose_Steprecipients1Inputs */
/** @typedef {{}} Compose_Steptemplate1Inputs */
/** @typedef {{}} Compose_Stepmessage1Inputs */
/** @typedef {{}} Compose_Stepsmtp1Inputs */
/** @typedef {{}} Compose_Stepgenerate1Inputs */
/** @typedef {{}} Compose_Stepsend1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Datacoversallslots3Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Compose_Unknownslotfooter2Inputs */
/** @typedef {{}} Compose_Writesubjecttocontinue3Inputs */
/** @typedef {{}} Compose_Writebodytocontinue3Inputs */
/** @typedef {{}} Compose_Messagelooksgood2Inputs */
/** @typedef {{}} Compose_Connectiondetailsready2Inputs */
/** @typedef {{}} Compose_Completesmtpdetails2Inputs */
/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Generatedfailedfooter2Inputs */
/** @typedef {{}} Compose_Prefillreenterpassword2Inputs */
/** @typedef {{}} Compose_Searchrecipients1Inputs */
/** @typedef {{}} Compose_Searchplaceholder1Inputs */
/** @typedef {{}} Compose_Filterbybatch2Inputs */
/** @typedef {{}} Compose_Allbatches1Inputs */
/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Compose_Batchoption1Inputs */
/** @typedef {{ total: NonNullable<unknown> }} Compose_Selectallmatchingtitle3Inputs */
/** @typedef {{ total: NonNullable<unknown> }} Compose_Selectallcount2Inputs */
/** @typedef {{}} Compose_Couldnotloadrecipients3Inputs */
/** @typedef {{}} Compose_Norecipientsyet2Inputs */
/** @typedef {{}} Compose_Norecipientsmatchfilter3Inputs */
/** @typedef {{}} Compose_Norecipientshint2Inputs */
/** @typedef {{}} Compose_Gotoimport2Inputs */
/** @typedef {{}} Compose_Trydifferentfilter2Inputs */
/** @typedef {{}} Compose_Selectallonpage3Inputs */
/** @typedef {{}} Compose_NameInputs */
/** @typedef {{}} Compose_EmailInputs */
/** @typedef {{}} Compose_PhoneInputs */
/** @typedef {{ name: NonNullable<unknown> }} Compose_Selectrecipient1Inputs */
/** @typedef {{ selected: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Selectioncount1Inputs */
/** @typedef {{ page: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Pageof1Inputs */
/** @typedef {{}} Compose_Templatelabel1Inputs */
/** @typedef {{}} Compose_Choosetemplate1Inputs */
/** @typedef {{}} Compose_Notemplatesregistered2Inputs */
/** @typedef {{}} Compose_Registertemplatelink2Inputs */
/** @typedef {{}} Compose_Notemplatesregisteredhint3Inputs */
/** @typedef {{}} Compose_Requiredslots1Inputs */
/** @typedef {{}} Compose_Outputpattern1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Allcovered1Inputs */
/** @typedef {{ missing: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Missingdatasummary2Inputs */
/** @typedef {{}} Compose_Missingdatahint2Inputs */
/** @typedef {{}} Compose_SubjectInputs */
/** @typedef {{ name: NonNullable<unknown>, instansi: NonNullable<unknown> }} Compose_Subjectplaceholder1Inputs */
/** @typedef {{}} Compose_Bodylabel1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Compose_Bodyplaceholder1Inputs */
/** @typedef {{}} Compose_Unknownslothint2Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Missingslottitle2Inputs */
/** @typedef {{}} Compose_Missingslothint2Inputs */
/** @typedef {{}} Compose_Livepreview1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Compose_Previewfor1Inputs */
/** @typedef {{}} Compose_Emailconnection1Inputs */
/** @typedef {{}} Compose_Savedprofile1Inputs */
/** @typedef {{}} Compose_Enterdetails1Inputs */
/** @typedef {{}} Compose_Chooseprofile1Inputs */
/** @typedef {{}} Compose_Nosavedprofileshint3Inputs */
/** @typedef {{}} Compose_Settingslink1Inputs */
/** @typedef {{}} Compose_HostInputs */
/** @typedef {{}} Compose_Portlabel1Inputs */
/** @typedef {{}} Compose_Usernamelabel1Inputs */
/** @typedef {{}} Compose_Apppasswordlabel2Inputs */
/** @typedef {{}} Compose_Saveasprofile2Inputs */
/** @typedef {{}} Compose_Profilenameplaceholder2Inputs */
/** @typedef {{}} Compose_Testconnectionbutton2Inputs */
/** @typedef {{}} Compose_Senderidentity1Inputs */
/** @typedef {{}} Compose_Sendername1Inputs */
/** @typedef {{}} Compose_Senderaddress1Inputs */
/** @typedef {{}} Compose_Sendingrate1Inputs */
/** @typedef {{ ms: NonNullable<unknown> }} Compose_Sendingratems2Inputs */
/** @typedef {{}} Compose_Sendingratehint2Inputs */
/** @typedef {{}} Compose_Generationfailed1Inputs */
/** @typedef {{}} Compose_Connectionfailed1Inputs */
/** @typedef {{}} Compose_Choosetemplatefirst2Inputs */
/** @typedef {{}} Compose_Campaignsummary1Inputs */
/** @typedef {{}} Compose_RecipientsInputs */
/** @typedef {{}} Compose_TemplateInputs */
/** @typedef {{}} Compose_Outputfolder1Inputs */
/** @typedef {{}} Compose_Campaignsummaryhint2Inputs */
/** @typedef {{}} Compose_Generatepdfs1Inputs */
/** @typedef {{}} Compose_GeneratingInputs */
/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Oftotal1Inputs */
/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown>, pending: NonNullable<unknown> }} Compose_Generatedcounts1Inputs */
/** @typedef {{}} Compose_Tryagain1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Allgenerated1Inputs */
/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Generatedwithfailures2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Failedrecipientstitle2Inputs */
/** @typedef {{}} Compose_Spotcheck1Inputs */
/** @typedef {{ index: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Spotindex1Inputs */
/** @typedef {{}} Compose_Loadingpreview1Inputs */
/** @typedef {{}} Compose_Sendsummary1Inputs */
/** @typedef {{}} Compose_SenderInputs */
/** @typedef {{}} Compose_ConnectionInputs */
/** @typedef {{}} Compose_PacingInputs */
/** @typedef {{}} Compose_AttachmentsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Generatedpdfscount2Inputs */
/** @typedef {{}} Compose_Preflighthint1Inputs */
/** @typedef {{}} Compose_Nogeneratedattachments2Inputs */
/** @typedef {{}} Compose_Preparingsend1Inputs */
/** @typedef {{}} Compose_SendingInputs */
/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown>, pending: NonNullable<unknown> }} Compose_Sendcounts1Inputs */
/** @typedef {{}} Compose_Windingdowntitle2Inputs */
/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Cancelsendconfirm2Inputs */
/** @typedef {{}} Compose_Perrecipientlog2Inputs */
/** @typedef {{}} Compose_Waitingfirstemail2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Allemailssent2Inputs */
/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Sentwithfailures2Inputs */
/** @typedef {{}} Compose_Sendcancelled1Inputs */
/** @typedef {{ sent: NonNullable<unknown>, skipped: NonNullable<unknown> }} Compose_Cancelleddetail1Inputs */
/** @typedef {{}} Compose_RecipientInputs */
/** @typedef {{}} Compose_Rowskipped1Inputs */
/** @typedef {{}} Compose_Sendingfailed1Inputs */
/** @typedef {{}} Compose_Couldnotstartsend3Inputs */
/** @typedef {{}} Compose_Couldnotpausesend3Inputs */
/** @typedef {{}} Compose_Couldnotcancelsend3Inputs */
/** @typedef {{}} Compose_Couldnotretryfailures3Inputs */
/** @typedef {{}} Compose_Sendjobnolongerexists4Inputs */
/** @typedef {{}} Compose_Couldnotresumesend3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Recipientsselectedone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Recipientsselectedother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefillretryone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefillretryother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefilldeletedone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefilldeletedother2Inputs */
/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountone3Inputs */
/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountother3Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleone3Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintone3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountother2Inputs */
/** @typedef {{}} Compose_Apppasswordplaceholder2Inputs */
/** @typedef {{}} Templates_TitleInputs */
/** @typedef {{}} Templates_Addtemplate1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Templateregistered1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Templatesaved1Inputs */
/** @typedef {{}} Templates_Templatedeleted1Inputs */
/** @typedef {{}} Templates_Couldnotregister2Inputs */
/** @typedef {{}} Templates_Couldnotsave2Inputs */
/** @typedef {{}} Templates_Couldnotdelete2Inputs */
/** @typedef {{}} Templates_Couldnotload2Inputs */
/** @typedef {{}} Templates_Loadingtemplates1Inputs */
/** @typedef {{}} Templates_Notemplatesyet2Inputs */
/** @typedef {{}} Templates_Notemplateshint2Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Templates_Unsupportedfile1Inputs */
/** @typedef {{}} Templates_RegisteredInputs */
/** @typedef {{}} Templates_SlotsInputs */
/** @typedef {{}} Templates_Noslotsdeclared2Inputs */
/** @typedef {{}} Templates_Outputpatternhint2Inputs */
/** @typedef {{}} Templates_Editexternallyhint2Inputs */
/** @typedef {{}} Templates_EditInputs */
/** @typedef {{}} Templates_Addtitle1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Edittitle1Inputs */
/** @typedef {{}} Templates_Templatename1Inputs */
/** @typedef {{}} Templates_ScanningInputs */
/** @typedef {{}} Templates_Rescanfromfile2Inputs */
/** @typedef {{}} Templates_Rescanconfirm1Inputs */
/** @typedef {{}} Templates_Replaceslots1Inputs */
/** @typedef {{}} Templates_Keepmyslots2Inputs */
/** @typedef {{ placeholders: NonNullable<unknown> }} Templates_Docxslotshint2Inputs */
/** @typedef {{}} Templates_Imageslotshint2Inputs */
/** @typedef {{}} Templates_Couldnotscan2Inputs */
/** @typedef {{}} Templates_Slotscanbetyped3Inputs */
/** @typedef {{ index: NonNullable<unknown> }} Templates_Slotaria1Inputs */
/** @typedef {{ index: NonNullable<unknown> }} Templates_Removeslotaria2Inputs */
/** @typedef {{}} Templates_Addslot1Inputs */
/** @typedef {{}} Templates_Outputpatternfield2Inputs */
/** @typedef {{ no: NonNullable<unknown>, name: NonNullable<unknown> }} Templates_Outputpatternplaceholder2Inputs */
/** @typedef {{}} Templates_Registertemplate1Inputs */
/** @typedef {{}} Templates_Savechanges1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Deletetitle1Inputs */
/** @typedef {{}} Templates_Deletedescription1Inputs */
/** @typedef {{}} Templates_Thistemplate1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Templates_Countregisteredone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Templates_Countregisteredother2Inputs */
/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Templates_Slotcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Templates_Slotcountother2Inputs */
/** @typedef {{}} Importpage_Title1Inputs */
/** @typedef {{}} Importpage_Description1Inputs */
/** @typedef {{}} Importpage_Importanotherfile3Inputs */
/** @typedef {{}} Importpage_Dragdrophint3Inputs */
/** @typedef {{}} Importpage_Fileformathint3Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Importpage_Parsing1Inputs */
/** @typedef {{}} Importpage_Importcomplete2Inputs */
/** @typedef {{}} Importpage_Gotocompose3Inputs */
/** @typedef {{}} Importpage_Gotorecipients3Inputs */
/** @typedef {{}} Importpage_Couldnotread3Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Importpage_Notexcelfile3Inputs */
/** @typedef {{}} Importpage_Couldnotcommit3Inputs */
/** @typedef {{}} Importpage_Preview1Inputs */
/** @typedef {{ fileName: NonNullable<unknown>, shown: NonNullable<unknown>, total: NonNullable<unknown> }} Importpage_Previewrows2Inputs */
/** @typedef {{}} Importpage_Columnmapping2Inputs */
/** @typedef {{}} Importpage_Columnmappinghint3Inputs */
/** @typedef {{ column: NonNullable<unknown> }} Importpage_Columnrolearia3Inputs */
/** @typedef {{}} Importpage_Resetmapping2Inputs */
/** @typedef {{}} Importpage_Selectnamecolumn3Inputs */
/** @typedef {{}} Importpage_Importing1Inputs */
/** @typedef {{}} Importpage_Importrecipients2Inputs */
/** @typedef {{}} Importpage_Nodatarows3Inputs */
/** @typedef {{}} Importpage_Rolename2Inputs */
/** @typedef {{}} Importpage_Roleemail2Inputs */
/** @typedef {{}} Importpage_Rolephone2Inputs */
/** @typedef {{}} Importpage_Rolemetadata2Inputs */
/** @typedef {{}} Importpage_Roleskip2Inputs */
/** @typedef {{ imported: NonNullable<unknown>, fileName: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importcompletedetailone4Inputs */
/** @typedef {{ imported: NonNullable<unknown>, fileName: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importcompletedetailother4Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Rowsskippednonameone5Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Rowsskippednonameother5Inputs */
/** @typedef {{ imported: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importedtoastone3Inputs */
/** @typedef {{ imported: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importedtoastother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Duplicatesskippedparsingone4Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Duplicatesskippedparsingother4Inputs */
/** @typedef {{}} Recipients_TitleInputs */
/** @typedef {{}} Recipients_Couldnotdelete2Inputs */
/** @typedef {{}} Recipients_Deleteselected1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deleteselectedcount2Inputs */
/** @typedef {{}} Recipients_Searchplaceholder1Inputs */
/** @typedef {{}} Recipients_Searcharia1Inputs */
/** @typedef {{}} Recipients_Filterbybatch2Inputs */
/** @typedef {{}} Recipients_Allbatches1Inputs */
/** @typedef {{}} Recipients_Couldnotload2Inputs */
/** @typedef {{}} Recipients_Loadingrecipients1Inputs */
/** @typedef {{}} Recipients_Norecipientsyet2Inputs */
/** @typedef {{}} Recipients_Norecipientshint2Inputs */
/** @typedef {{}} Recipients_Gotoimport2Inputs */
/** @typedef {{}} Recipients_Nomatchfilters2Inputs */
/** @typedef {{}} Recipients_Nomatchhint2Inputs */
/** @typedef {{}} Recipients_Clearfilters1Inputs */
/** @typedef {{ from: NonNullable<unknown>, to: NonNullable<unknown>, total: NonNullable<unknown> }} Recipients_Showingrange1Inputs */
/** @typedef {{}} Recipients_PreviousInputs */
/** @typedef {{}} Recipients_NextInputs */
/** @typedef {{ page: NonNullable<unknown>, count: NonNullable<unknown> }} Recipients_Pageof1Inputs */
/** @typedef {{}} Recipients_Selectallonpage3Inputs */
/** @typedef {{}} Recipients_NameInputs */
/** @typedef {{}} Recipients_EmailInputs */
/** @typedef {{}} Recipients_PhoneInputs */
/** @typedef {{}} Recipients_Importbatch1Inputs */
/** @typedef {{}} Recipients_ImportedInputs */
/** @typedef {{ name: NonNullable<unknown> }} Recipients_Selectrecipient1Inputs */
/** @typedef {{}} Recipients_Noemailaddress2Inputs */
/** @typedef {{}} Recipients_Customfields1Inputs */
/** @typedef {{}} Recipients_Nocustomfields2Inputs */
/** @typedef {{}} Recipients_Deletedescription1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Countindirectoryone3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Countindirectoryother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletedcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletedcountother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletetitleone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletetitleother2Inputs */
/** @typedef {{}} Logs_TitleInputs */
/** @typedef {{}} Logs_DescriptionInputs */
/** @typedef {{}} Logs_Filterbystatus2Inputs */
/** @typedef {{}} Logs_Allstatuses1Inputs */
/** @typedef {{}} Logs_FromInputs */
/** @typedef {{}} Logs_ToInputs */
/** @typedef {{}} Logs_Jobscreatedfrom2Inputs */
/** @typedef {{}} Logs_Jobscreatedupto3Inputs */
/** @typedef {{}} Logs_Couldnotload2Inputs */
/** @typedef {{}} Logs_Loadinglogs1Inputs */
/** @typedef {{}} Logs_Nojobsmatchfilters3Inputs */
/** @typedef {{}} Logs_Nojobshint2Inputs */
/** @typedef {{}} Logs_Nosendjobsyet3Inputs */
/** @typedef {{}} Logs_Nosendjobshint3Inputs */
/** @typedef {{}} Logs_StatusInputs */
/** @typedef {{}} Logs_SubjectInputs */
/** @typedef {{}} Logs_TemplateInputs */
/** @typedef {{}} Logs_Sentfailedskipped2Inputs */
/** @typedef {{}} Logs_StartedInputs */
/** @typedef {{}} Logs_DurationInputs */
/** @typedef {{ sent: NonNullable<unknown>, total: NonNullable<unknown> }} Logs_Pausedprogress1Inputs */
/** @typedef {{}} Logs_ResumingInputs */
/** @typedef {{}} Jobdetail_Alllogs2Inputs */
/** @typedef {{}} Jobdetail_Jobdetail2Inputs */
/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown>, skipped: NonNullable<unknown> }} Jobdetail_Counts1Inputs */
/** @typedef {{}} Jobdetail_Resume1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Jobdetail_Retryallfailures3Inputs */
/** @typedef {{}} Jobdetail_Template1Inputs */
/** @typedef {{}} Jobdetail_Smtp1Inputs */
/** @typedef {{}} Jobdetail_Sender1Inputs */
/** @typedef {{}} Jobdetail_Startedduration2Inputs */
/** @typedef {{}} Jobdetail_Deletedprofile2Inputs */
/** @typedef {{}} Jobdetail_Inline1Inputs */
/** @typedef {{}} Jobdetail_Recipient1Inputs */
/** @typedef {{}} Jobdetail_Noemailaddress3Inputs */
/** @typedef {{}} Jobdetail_Error1Inputs */
/** @typedef {{}} Jobdetail_Sentat2Inputs */
/** @typedef {{}} Jobdetail_Messageid2Inputs */
/** @typedef {{}} Jobdetail_Retry1Inputs */
/** @typedef {{}} Jobdetail_Searchplaceholder2Inputs */
/** @typedef {{}} Jobdetail_Searcharia2Inputs */
/** @typedef {{}} Jobdetail_Filterbystatus3Inputs */
/** @typedef {{}} Jobdetail_Loadingjob2Inputs */
/** @typedef {{}} Jobdetail_Couldnotload3Inputs */
/** @typedef {{}} Jobdetail_Jobnotfound3Inputs */
/** @typedef {{}} Jobdetail_Jobnotfoundhint4Inputs */
/** @typedef {{}} Jobdetail_Backtologs3Inputs */
/** @typedef {{}} Jobdetail_Nomatchsearch3Inputs */
/** @typedef {{}} Jobdetail_Nomatchhint3Inputs */
/** @typedef {{}} Jobdetail_Status1Inputs */
/** @typedef {{}} Sendjob_Selectrecipients2Inputs */
/** @typedef {{}} Sendjob_Writesubject2Inputs */
/** @typedef {{}} Sendjob_Writebody2Inputs */
/** @typedef {{}} Sendjob_Entersender2Inputs */
/** @typedef {{}} Sendjob_Chooseoneidentity3Inputs */
/** @typedef {{}} Sendjob_Norecipientsexist3Inputs */
/** @typedef {{}} Sendjob_Alreadysending2Inputs */
/** @typedef {{}} Sendjob_Anothersendactive3Inputs */
/** @typedef {{}} Sendjob_Stillpausing2Inputs */
/** @typedef {{}} Sendjob_Onlysendingcanpause4Inputs */
/** @typedef {{}} Sendjob_Onlypausedcanresume4Inputs */
/** @typedef {{}} Sendjob_Finishedcannotcancel3Inputs */
/** @typedef {{}} Sendjob_Onlyfinishedcanretry4Inputs */
/** @typedef {{}} Sendjob_Nofailedrecipients3Inputs */
/** @typedef {{}} Sendjob_Noconfirmedattachments3Inputs */
/** @typedef {{}} Sendjob_Attachmentsmissingondisk4Inputs */
/** @typedef {{}} Sendjob_Recipientdeleted2Inputs */
/** @typedef {{}} Sendjob_Recipientnoemail3Inputs */
/** @typedef {{}} Sendjob_Noattachmentforrecipient4Inputs */
/** @typedef {{ message: NonNullable<unknown> }} Sendjob_Retriesexhausted2Inputs */
/** @typedef {{}} Sendjob_Couldnotresumejob4Inputs */
/** @typedef {{}} Generatejob_Templatemissing2Inputs */
/** @typedef {{ path: NonNullable<unknown> }} Generatejob_Templatefilemissing3Inputs */
/** @typedef {{}} Generatejob_Libreofficemissing3Inputs */
/** @typedef {{}} Generatejob_Recipientdeleted2Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Generatejob_Missingslotdata3Inputs */
/** @typedef {{ message: NonNullable<unknown> }} Generatejob_Couldnotfill3Inputs */
/** @typedef {{}} Generatejob_Nopdfproduced3Inputs */
/** @typedef {{}} Generatejob_Selectrecipients2Inputs */
/** @typedef {{}} Generatejob_Norecipientsexist3Inputs */
/** @typedef {{}} Generatejob_Jobcouldnotbecreated5Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Generatejob_Nofreefilename4Inputs */
/** @typedef {{}} Templatesservice_Docxonly2Inputs */
/** @typedef {{ path: NonNullable<unknown>, detail: NonNullable<unknown> }} Templatesservice_Couldnotread3Inputs */
/** @typedef {{}} Importservice_Nonamecolumn3Inputs */
/** @typedef {{}} Importservice_Noemailcolumn3Inputs */
/** @typedef {{}} Importservice_Notexcel2Inputs */
/** @typedef {{ headers: NonNullable<unknown> }} Importservice_Duplicateheaders2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importservice_Rowsskippedemptyname4Inputs */
/** @typedef {{}} Validation_Smtpnamerequired2Inputs */
/** @typedef {{}} Validation_Smtphostrequired2Inputs */
/** @typedef {{}} Validation_Smtpportinvalid2Inputs */
/** @typedef {{}} Validation_Smtpusernamerequired2Inputs */
/** @typedef {{}} Validation_Smtppasswordrequired2Inputs */
/** @typedef {{}} Validation_Templatenamerequired2Inputs */
/** @typedef {{}} Validation_Templateneedsslot2Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Validation_Templatepatternneedsslot3Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Validation_Templatepatternunknownslot3Inputs */
/** @typedef {{}} Dialogs_Excelfilter1Inputs */
/** @typedef {{}} Dialogs_Templatefilter1Inputs */
export const common_back: (inputs: Common_BackInputs) => LocalizedString;
export const common_next: (inputs: Common_NextInputs) => LocalizedString;
export const common_cancel: (inputs: Common_CancelInputs) => LocalizedString;
export const common_save: (inputs: Common_SaveInputs) => LocalizedString;
export const common_delete: (inputs: Common_DeleteInputs) => LocalizedString;
export const common_retry: (inputs: Common_RetryInputs) => LocalizedString;
export const common_resume: (inputs: Common_ResumeInputs) => LocalizedString;
export const common_pause: (inputs: Common_PauseInputs) => LocalizedString;
export const common_prev: (inputs: Common_PrevInputs) => LocalizedString;
export const common_clear: (inputs: Common_ClearInputs) => LocalizedString;
export const common_dismiss: (inputs: Common_DismissInputs) => LocalizedString;
export const common_browse: (inputs: Common_BrowseInputs) => LocalizedString;
export const common_loading: (inputs: Common_LoadingInputs) => LocalizedString;
export const common_saved: (inputs: Common_SavedInputs) => LocalizedString;
export const common_saving: (inputs: Common_SavingInputs) => LocalizedString;
export const common_deleting: (inputs: Common_DeletingInputs) => LocalizedString;
export const common_testing: (inputs: Common_TestingInputs) => LocalizedString;
export const common_closedetails1: (inputs: Common_Closedetails1Inputs) => LocalizedString;
export const common_couldnotload2: (inputs: Common_Couldnotload2Inputs) => LocalizedString;
export const common_couldnotsave2: (inputs: Common_Couldnotsave2Inputs) => LocalizedString;
export const common_retryfailures1: (inputs: Common_Retryfailures1Inputs) => LocalizedString;
export const nav_import: (inputs: Nav_ImportInputs) => LocalizedString;
export const nav_recipients: (inputs: Nav_RecipientsInputs) => LocalizedString;
export const nav_templates: (inputs: Nav_TemplatesInputs) => LocalizedString;
export const nav_compose: (inputs: Nav_ComposeInputs) => LocalizedString;
export const nav_logs: (inputs: Nav_LogsInputs) => LocalizedString;
export const nav_settings: (inputs: Nav_SettingsInputs) => LocalizedString;
export const app_backendunreachable1: (inputs: App_Backendunreachable1Inputs) => LocalizedString;
export const welcome_title: (inputs: Welcome_TitleInputs) => LocalizedString;
export const welcome_subtitle: (inputs: Welcome_SubtitleInputs) => LocalizedString;
export const welcome_checkinglibreoffice2: (inputs: Welcome_Checkinglibreoffice2Inputs) => LocalizedString;
export const welcome_libreofficepurpose2: (inputs: Welcome_Libreofficepurpose2Inputs) => LocalizedString;
export const welcome_libreofficefound2: (inputs: Welcome_Libreofficefound2Inputs) => LocalizedString;
export const welcome_libreofficemissing2: (inputs: Welcome_Libreofficemissing2Inputs) => LocalizedString;
export const welcome_libreofficemissingdetail3: (inputs: Welcome_Libreofficemissingdetail3Inputs) => LocalizedString;
export const welcome_installwith1: (inputs: Welcome_Installwith1Inputs) => LocalizedString;
export const welcome_downloadfrom1: (inputs: Welcome_Downloadfrom1Inputs) => LocalizedString;
export const welcome_checkagain1: (inputs: Welcome_Checkagain1Inputs) => LocalizedString;
export const welcome_templatesfolder1: (inputs: Welcome_Templatesfolder1Inputs) => LocalizedString;
export const welcome_outputfolder1: (inputs: Welcome_Outputfolder1Inputs) => LocalizedString;
export const welcome_settingup1: (inputs: Welcome_Settingup1Inputs) => LocalizedString;
export const welcome_getstarted1: (inputs: Welcome_Getstarted1Inputs) => LocalizedString;
export const status_pending: (inputs: Status_PendingInputs) => LocalizedString;
export const status_sending: (inputs: Status_SendingInputs) => LocalizedString;
export const status_paused: (inputs: Status_PausedInputs) => LocalizedString;
export const status_completed: (inputs: Status_CompletedInputs) => LocalizedString;
export const status_cancelled: (inputs: Status_CancelledInputs) => LocalizedString;
export const status_failed: (inputs: Status_FailedInputs) => LocalizedString;
export const status_skipped: (inputs: Status_SkippedInputs) => LocalizedString;
export const status_sent: (inputs: Status_SentInputs) => LocalizedString;
export const settingspage_title1: (inputs: Settingspage_Title1Inputs) => LocalizedString;
export const settingspage_description1: (inputs: Settingspage_Description1Inputs) => LocalizedString;
export const settingspage_ratelimiting2: (inputs: Settingspage_Ratelimiting2Inputs) => LocalizedString;
export const settingspage_ratelimitingdescription3: (inputs: Settingspage_Ratelimitingdescription3Inputs) => LocalizedString;
export const settingspage_msperemail3: (inputs: Settingspage_Msperemail3Inputs) => LocalizedString;
export const settingspage_delaybetweenemails3: (inputs: Settingspage_Delaybetweenemails3Inputs) => LocalizedString;
export const settingspage_defaultfolders2: (inputs: Settingspage_Defaultfolders2Inputs) => LocalizedString;
export const settingspage_defaultfoldersdescription3: (inputs: Settingspage_Defaultfoldersdescription3Inputs) => LocalizedString;
export const settingspage_templatesfolder2: (inputs: Settingspage_Templatesfolder2Inputs) => LocalizedString;
export const settingspage_outputfolder2: (inputs: Settingspage_Outputfolder2Inputs) => LocalizedString;
export const settingspage_about1: (inputs: Settingspage_About1Inputs) => LocalizedString;
export const settingspage_app1: (inputs: Settingspage_App1Inputs) => LocalizedString;
export const settingspage_version1: (inputs: Settingspage_Version1Inputs) => LocalizedString;
export const settingspage_data1: (inputs: Settingspage_Data1Inputs) => LocalizedString;
export const settingspage_storedlocally2: (inputs: Settingspage_Storedlocally2Inputs) => LocalizedString;
export const settingspage_language1: (inputs: Settingspage_Language1Inputs) => LocalizedString;
export const settingspage_languagedescription2: (inputs: Settingspage_Languagedescription2Inputs) => LocalizedString;
export const settingspage_ratepersecondone4: (inputs: Settingspage_Ratepersecondone4Inputs) => LocalizedString;
export const settingspage_ratepersecondother4: (inputs: Settingspage_Ratepersecondother4Inputs) => LocalizedString;
export const settingspage_couldnotload3: (inputs: Settingspage_Couldnotload3Inputs) => LocalizedString;
export const smtp_title: (inputs: Smtp_TitleInputs) => LocalizedString;
export const smtp_description: (inputs: Smtp_DescriptionInputs) => LocalizedString;
export const smtp_addprofile1: (inputs: Smtp_Addprofile1Inputs) => LocalizedString;
export const smtp_profilesaved1: (inputs: Smtp_Profilesaved1Inputs) => LocalizedString;
export const smtp_profiledeleted1: (inputs: Smtp_Profiledeleted1Inputs) => LocalizedString;
export const smtp_couldnotsaveprofile3: (inputs: Smtp_Couldnotsaveprofile3Inputs) => LocalizedString;
export const smtp_couldnotdeleteprofile3: (inputs: Smtp_Couldnotdeleteprofile3Inputs) => LocalizedString;
export const smtp_couldnotloadprofiles3: (inputs: Smtp_Couldnotloadprofiles3Inputs) => LocalizedString;
export const smtp_loadingprofiles1: (inputs: Smtp_Loadingprofiles1Inputs) => LocalizedString;
export const smtp_noprofilesyet2: (inputs: Smtp_Noprofilesyet2Inputs) => LocalizedString;
export const smtp_noprofilesdescription2: (inputs: Smtp_Noprofilesdescription2Inputs) => LocalizedString;
export const smtp_testconnection1: (inputs: Smtp_Testconnection1Inputs) => LocalizedString;
export const smtp_connectionok1: (inputs: Smtp_Connectionok1Inputs) => LocalizedString;
export const smtp_connected: (inputs: Smtp_ConnectedInputs) => LocalizedString;
export const smtp_connectionfailed1: (inputs: Smtp_Connectionfailed1Inputs) => LocalizedString;
export const smtp_passwordnotset2: (inputs: Smtp_Passwordnotset2Inputs) => LocalizedString;
export const smtp_addprofiletitle2: (inputs: Smtp_Addprofiletitle2Inputs) => LocalizedString;
export const smtp_editprofiletitle2: (inputs: Smtp_Editprofiletitle2Inputs) => LocalizedString;
export const smtp_createhint1: (inputs: Smtp_Createhint1Inputs) => LocalizedString;
export const smtp_edithint1: (inputs: Smtp_Edithint1Inputs) => LocalizedString;
export const smtp_profilename1: (inputs: Smtp_Profilename1Inputs) => LocalizedString;
export const smtp_smtphost1: (inputs: Smtp_Smtphost1Inputs) => LocalizedString;
export const smtp_port: (inputs: Smtp_PortInputs) => LocalizedString;
export const smtp_implicittls1: (inputs: Smtp_Implicittls1Inputs) => LocalizedString;
export const smtp_starttls: (inputs: Smtp_StarttlsInputs) => LocalizedString;
export const smtp_username: (inputs: Smtp_UsernameInputs) => LocalizedString;
export const smtp_apppassword1: (inputs: Smtp_Apppassword1Inputs) => LocalizedString;
export const smtp_leaveblanktokeep3: (inputs: Smtp_Leaveblanktokeep3Inputs) => LocalizedString;
export const smtp_gmailapppasswordhint3: (inputs: Smtp_Gmailapppasswordhint3Inputs) => LocalizedString;
export const smtp_saveprofile1: (inputs: Smtp_Saveprofile1Inputs) => LocalizedString;
export const smtp_savechanges1: (inputs: Smtp_Savechanges1Inputs) => LocalizedString;
export const smtp_deleteprofiletitle2: (inputs: Smtp_Deleteprofiletitle2Inputs) => LocalizedString;
export const smtp_deleteprofiledescription2: (inputs: Smtp_Deleteprofiledescription2Inputs) => LocalizedString;
export const smtp_passwordlabel1: (inputs: Smtp_Passwordlabel1Inputs) => LocalizedString;
export const compose_title: (inputs: Compose_TitleInputs) => LocalizedString;
export const compose_description: (inputs: Compose_DescriptionInputs) => LocalizedString;
export const compose_steprecipients1: (inputs: Compose_Steprecipients1Inputs) => LocalizedString;
export const compose_steptemplate1: (inputs: Compose_Steptemplate1Inputs) => LocalizedString;
export const compose_stepmessage1: (inputs: Compose_Stepmessage1Inputs) => LocalizedString;
export const compose_stepsmtp1: (inputs: Compose_Stepsmtp1Inputs) => LocalizedString;
export const compose_stepgenerate1: (inputs: Compose_Stepgenerate1Inputs) => LocalizedString;
export const compose_stepsend1: (inputs: Compose_Stepsend1Inputs) => LocalizedString;
export const compose_datacoversallslots3: (inputs: Compose_Datacoversallslots3Inputs) => LocalizedString;
export const compose_unknownslotfooter2: (inputs: Compose_Unknownslotfooter2Inputs) => LocalizedString;
export const compose_writesubjecttocontinue3: (inputs: Compose_Writesubjecttocontinue3Inputs) => LocalizedString;
export const compose_writebodytocontinue3: (inputs: Compose_Writebodytocontinue3Inputs) => LocalizedString;
export const compose_messagelooksgood2: (inputs: Compose_Messagelooksgood2Inputs) => LocalizedString;
export const compose_connectiondetailsready2: (inputs: Compose_Connectiondetailsready2Inputs) => LocalizedString;
export const compose_completesmtpdetails2: (inputs: Compose_Completesmtpdetails2Inputs) => LocalizedString;
export const compose_generatedfailedfooter2: (inputs: Compose_Generatedfailedfooter2Inputs) => LocalizedString;
export const compose_prefillreenterpassword2: (inputs: Compose_Prefillreenterpassword2Inputs) => LocalizedString;
export const compose_searchrecipients1: (inputs: Compose_Searchrecipients1Inputs) => LocalizedString;
export const compose_searchplaceholder1: (inputs: Compose_Searchplaceholder1Inputs) => LocalizedString;
export const compose_filterbybatch2: (inputs: Compose_Filterbybatch2Inputs) => LocalizedString;
export const compose_allbatches1: (inputs: Compose_Allbatches1Inputs) => LocalizedString;
export const compose_batchoption1: (inputs: Compose_Batchoption1Inputs) => LocalizedString;
export const compose_selectallmatchingtitle3: (inputs: Compose_Selectallmatchingtitle3Inputs) => LocalizedString;
export const compose_selectallcount2: (inputs: Compose_Selectallcount2Inputs) => LocalizedString;
export const compose_couldnotloadrecipients3: (inputs: Compose_Couldnotloadrecipients3Inputs) => LocalizedString;
export const compose_norecipientsyet2: (inputs: Compose_Norecipientsyet2Inputs) => LocalizedString;
export const compose_norecipientsmatchfilter3: (inputs: Compose_Norecipientsmatchfilter3Inputs) => LocalizedString;
export const compose_norecipientshint2: (inputs: Compose_Norecipientshint2Inputs) => LocalizedString;
export const compose_gotoimport2: (inputs: Compose_Gotoimport2Inputs) => LocalizedString;
export const compose_trydifferentfilter2: (inputs: Compose_Trydifferentfilter2Inputs) => LocalizedString;
export const compose_selectallonpage3: (inputs: Compose_Selectallonpage3Inputs) => LocalizedString;
export const compose_name: (inputs: Compose_NameInputs) => LocalizedString;
export const compose_email: (inputs: Compose_EmailInputs) => LocalizedString;
export const compose_phone: (inputs: Compose_PhoneInputs) => LocalizedString;
export const compose_selectrecipient1: (inputs: Compose_Selectrecipient1Inputs) => LocalizedString;
export const compose_selectioncount1: (inputs: Compose_Selectioncount1Inputs) => LocalizedString;
export const compose_pageof1: (inputs: Compose_Pageof1Inputs) => LocalizedString;
export const compose_templatelabel1: (inputs: Compose_Templatelabel1Inputs) => LocalizedString;
export const compose_choosetemplate1: (inputs: Compose_Choosetemplate1Inputs) => LocalizedString;
export const compose_notemplatesregistered2: (inputs: Compose_Notemplatesregistered2Inputs) => LocalizedString;
export const compose_registertemplatelink2: (inputs: Compose_Registertemplatelink2Inputs) => LocalizedString;
export const compose_notemplatesregisteredhint3: (inputs: Compose_Notemplatesregisteredhint3Inputs) => LocalizedString;
export const compose_requiredslots1: (inputs: Compose_Requiredslots1Inputs) => LocalizedString;
export const compose_outputpattern1: (inputs: Compose_Outputpattern1Inputs) => LocalizedString;
export const compose_allcovered1: (inputs: Compose_Allcovered1Inputs) => LocalizedString;
export const compose_missingdatasummary2: (inputs: Compose_Missingdatasummary2Inputs) => LocalizedString;
export const compose_missingdatahint2: (inputs: Compose_Missingdatahint2Inputs) => LocalizedString;
export const compose_subject: (inputs: Compose_SubjectInputs) => LocalizedString;
export const compose_subjectplaceholder1: (inputs: Compose_Subjectplaceholder1Inputs) => LocalizedString;
export const compose_bodylabel1: (inputs: Compose_Bodylabel1Inputs) => LocalizedString;
export const compose_bodyplaceholder1: (inputs: Compose_Bodyplaceholder1Inputs) => LocalizedString;
export const compose_unknownslothint2: (inputs: Compose_Unknownslothint2Inputs) => LocalizedString;
export const compose_missingslottitle2: (inputs: Compose_Missingslottitle2Inputs) => LocalizedString;
export const compose_missingslothint2: (inputs: Compose_Missingslothint2Inputs) => LocalizedString;
export const compose_livepreview1: (inputs: Compose_Livepreview1Inputs) => LocalizedString;
export const compose_previewfor1: (inputs: Compose_Previewfor1Inputs) => LocalizedString;
export const compose_emailconnection1: (inputs: Compose_Emailconnection1Inputs) => LocalizedString;
export const compose_savedprofile1: (inputs: Compose_Savedprofile1Inputs) => LocalizedString;
export const compose_enterdetails1: (inputs: Compose_Enterdetails1Inputs) => LocalizedString;
export const compose_chooseprofile1: (inputs: Compose_Chooseprofile1Inputs) => LocalizedString;
export const compose_nosavedprofileshint3: (inputs: Compose_Nosavedprofileshint3Inputs) => LocalizedString;
export const compose_settingslink1: (inputs: Compose_Settingslink1Inputs) => LocalizedString;
export const compose_host: (inputs: Compose_HostInputs) => LocalizedString;
export const compose_portlabel1: (inputs: Compose_Portlabel1Inputs) => LocalizedString;
export const compose_usernamelabel1: (inputs: Compose_Usernamelabel1Inputs) => LocalizedString;
export const compose_apppasswordlabel2: (inputs: Compose_Apppasswordlabel2Inputs) => LocalizedString;
export const compose_saveasprofile2: (inputs: Compose_Saveasprofile2Inputs) => LocalizedString;
export const compose_profilenameplaceholder2: (inputs: Compose_Profilenameplaceholder2Inputs) => LocalizedString;
export const compose_testconnectionbutton2: (inputs: Compose_Testconnectionbutton2Inputs) => LocalizedString;
export const compose_senderidentity1: (inputs: Compose_Senderidentity1Inputs) => LocalizedString;
export const compose_sendername1: (inputs: Compose_Sendername1Inputs) => LocalizedString;
export const compose_senderaddress1: (inputs: Compose_Senderaddress1Inputs) => LocalizedString;
export const compose_sendingrate1: (inputs: Compose_Sendingrate1Inputs) => LocalizedString;
export const compose_sendingratems2: (inputs: Compose_Sendingratems2Inputs) => LocalizedString;
export const compose_sendingratehint2: (inputs: Compose_Sendingratehint2Inputs) => LocalizedString;
export const compose_generationfailed1: (inputs: Compose_Generationfailed1Inputs) => LocalizedString;
export const compose_connectionfailed1: (inputs: Compose_Connectionfailed1Inputs) => LocalizedString;
export const compose_choosetemplatefirst2: (inputs: Compose_Choosetemplatefirst2Inputs) => LocalizedString;
export const compose_campaignsummary1: (inputs: Compose_Campaignsummary1Inputs) => LocalizedString;
export const compose_recipients: (inputs: Compose_RecipientsInputs) => LocalizedString;
export const compose_template: (inputs: Compose_TemplateInputs) => LocalizedString;
export const compose_outputfolder1: (inputs: Compose_Outputfolder1Inputs) => LocalizedString;
export const compose_campaignsummaryhint2: (inputs: Compose_Campaignsummaryhint2Inputs) => LocalizedString;
export const compose_generatepdfs1: (inputs: Compose_Generatepdfs1Inputs) => LocalizedString;
export const compose_generating: (inputs: Compose_GeneratingInputs) => LocalizedString;
export const compose_oftotal1: (inputs: Compose_Oftotal1Inputs) => LocalizedString;
export const compose_generatedcounts1: (inputs: Compose_Generatedcounts1Inputs) => LocalizedString;
export const compose_tryagain1: (inputs: Compose_Tryagain1Inputs) => LocalizedString;
export const compose_allgenerated1: (inputs: Compose_Allgenerated1Inputs) => LocalizedString;
export const compose_generatedwithfailures2: (inputs: Compose_Generatedwithfailures2Inputs) => LocalizedString;
export const compose_failedrecipientstitle2: (inputs: Compose_Failedrecipientstitle2Inputs) => LocalizedString;
export const compose_spotcheck1: (inputs: Compose_Spotcheck1Inputs) => LocalizedString;
export const compose_spotindex1: (inputs: Compose_Spotindex1Inputs) => LocalizedString;
export const compose_loadingpreview1: (inputs: Compose_Loadingpreview1Inputs) => LocalizedString;
export const compose_sendsummary1: (inputs: Compose_Sendsummary1Inputs) => LocalizedString;
export const compose_sender: (inputs: Compose_SenderInputs) => LocalizedString;
export const compose_connection: (inputs: Compose_ConnectionInputs) => LocalizedString;
export const compose_pacing: (inputs: Compose_PacingInputs) => LocalizedString;
export const compose_attachments: (inputs: Compose_AttachmentsInputs) => LocalizedString;
export const compose_generatedpdfscount2: (inputs: Compose_Generatedpdfscount2Inputs) => LocalizedString;
export const compose_preflighthint1: (inputs: Compose_Preflighthint1Inputs) => LocalizedString;
export const compose_nogeneratedattachments2: (inputs: Compose_Nogeneratedattachments2Inputs) => LocalizedString;
export const compose_preparingsend1: (inputs: Compose_Preparingsend1Inputs) => LocalizedString;
export const compose_sending: (inputs: Compose_SendingInputs) => LocalizedString;
export const compose_sendcounts1: (inputs: Compose_Sendcounts1Inputs) => LocalizedString;
export const compose_windingdowntitle2: (inputs: Compose_Windingdowntitle2Inputs) => LocalizedString;
export const compose_cancelsendconfirm2: (inputs: Compose_Cancelsendconfirm2Inputs) => LocalizedString;
export const compose_perrecipientlog2: (inputs: Compose_Perrecipientlog2Inputs) => LocalizedString;
export const compose_waitingfirstemail2: (inputs: Compose_Waitingfirstemail2Inputs) => LocalizedString;
export const compose_allemailssent2: (inputs: Compose_Allemailssent2Inputs) => LocalizedString;
export const compose_sentwithfailures2: (inputs: Compose_Sentwithfailures2Inputs) => LocalizedString;
export const compose_sendcancelled1: (inputs: Compose_Sendcancelled1Inputs) => LocalizedString;
export const compose_cancelleddetail1: (inputs: Compose_Cancelleddetail1Inputs) => LocalizedString;
export const compose_recipient: (inputs: Compose_RecipientInputs) => LocalizedString;
export const compose_rowskipped1: (inputs: Compose_Rowskipped1Inputs) => LocalizedString;
export const compose_sendingfailed1: (inputs: Compose_Sendingfailed1Inputs) => LocalizedString;
export const compose_couldnotstartsend3: (inputs: Compose_Couldnotstartsend3Inputs) => LocalizedString;
export const compose_couldnotpausesend3: (inputs: Compose_Couldnotpausesend3Inputs) => LocalizedString;
export const compose_couldnotcancelsend3: (inputs: Compose_Couldnotcancelsend3Inputs) => LocalizedString;
export const compose_couldnotretryfailures3: (inputs: Compose_Couldnotretryfailures3Inputs) => LocalizedString;
export const compose_sendjobnolongerexists4: (inputs: Compose_Sendjobnolongerexists4Inputs) => LocalizedString;
export const compose_couldnotresumesend3: (inputs: Compose_Couldnotresumesend3Inputs) => LocalizedString;
export const compose_recipientsselectedone2: (inputs: Compose_Recipientsselectedone2Inputs) => LocalizedString;
export const compose_recipientsselectedother2: (inputs: Compose_Recipientsselectedother2Inputs) => LocalizedString;
export const compose_prefillretryone2: (inputs: Compose_Prefillretryone2Inputs) => LocalizedString;
export const compose_prefillretryother2: (inputs: Compose_Prefillretryother2Inputs) => LocalizedString;
export const compose_prefilldeletedone2: (inputs: Compose_Prefilldeletedone2Inputs) => LocalizedString;
export const compose_prefilldeletedother2: (inputs: Compose_Prefilldeletedother2Inputs) => LocalizedString;
export const compose_slotmissingcountone3: (inputs: Compose_Slotmissingcountone3Inputs) => LocalizedString;
export const compose_slotmissingcountother3: (inputs: Compose_Slotmissingcountother3Inputs) => LocalizedString;
export const compose_unknownslottitleone3: (inputs: Compose_Unknownslottitleone3Inputs) => LocalizedString;
export const compose_unknownslottitleother3: (inputs: Compose_Unknownslottitleother3Inputs) => LocalizedString;
export const compose_livepreviewhintone3: (inputs: Compose_Livepreviewhintone3Inputs) => LocalizedString;
export const compose_livepreviewhintother3: (inputs: Compose_Livepreviewhintother3Inputs) => LocalizedString;
export const compose_sendcountone2: (inputs: Compose_Sendcountone2Inputs) => LocalizedString;
export const compose_sendcountother2: (inputs: Compose_Sendcountother2Inputs) => LocalizedString;
export const compose_apppasswordplaceholder2: (inputs: Compose_Apppasswordplaceholder2Inputs) => LocalizedString;
export const templates_title: (inputs: Templates_TitleInputs) => LocalizedString;
export const templates_addtemplate1: (inputs: Templates_Addtemplate1Inputs) => LocalizedString;
export const templates_templateregistered1: (inputs: Templates_Templateregistered1Inputs) => LocalizedString;
export const templates_templatesaved1: (inputs: Templates_Templatesaved1Inputs) => LocalizedString;
export const templates_templatedeleted1: (inputs: Templates_Templatedeleted1Inputs) => LocalizedString;
export const templates_couldnotregister2: (inputs: Templates_Couldnotregister2Inputs) => LocalizedString;
export const templates_couldnotsave2: (inputs: Templates_Couldnotsave2Inputs) => LocalizedString;
export const templates_couldnotdelete2: (inputs: Templates_Couldnotdelete2Inputs) => LocalizedString;
export const templates_couldnotload2: (inputs: Templates_Couldnotload2Inputs) => LocalizedString;
export const templates_loadingtemplates1: (inputs: Templates_Loadingtemplates1Inputs) => LocalizedString;
export const templates_notemplatesyet2: (inputs: Templates_Notemplatesyet2Inputs) => LocalizedString;
export const templates_notemplateshint2: (inputs: Templates_Notemplateshint2Inputs) => LocalizedString;
export const templates_unsupportedfile1: (inputs: Templates_Unsupportedfile1Inputs) => LocalizedString;
export const templates_registered: (inputs: Templates_RegisteredInputs) => LocalizedString;
export const templates_slots: (inputs: Templates_SlotsInputs) => LocalizedString;
export const templates_noslotsdeclared2: (inputs: Templates_Noslotsdeclared2Inputs) => LocalizedString;
export const templates_outputpatternhint2: (inputs: Templates_Outputpatternhint2Inputs) => LocalizedString;
export const templates_editexternallyhint2: (inputs: Templates_Editexternallyhint2Inputs) => LocalizedString;
export const templates_edit: (inputs: Templates_EditInputs) => LocalizedString;
export const templates_addtitle1: (inputs: Templates_Addtitle1Inputs) => LocalizedString;
export const templates_edittitle1: (inputs: Templates_Edittitle1Inputs) => LocalizedString;
export const templates_templatename1: (inputs: Templates_Templatename1Inputs) => LocalizedString;
export const templates_scanning: (inputs: Templates_ScanningInputs) => LocalizedString;
export const templates_rescanfromfile2: (inputs: Templates_Rescanfromfile2Inputs) => LocalizedString;
export const templates_rescanconfirm1: (inputs: Templates_Rescanconfirm1Inputs) => LocalizedString;
export const templates_replaceslots1: (inputs: Templates_Replaceslots1Inputs) => LocalizedString;
export const templates_keepmyslots2: (inputs: Templates_Keepmyslots2Inputs) => LocalizedString;
export const templates_docxslotshint2: (inputs: Templates_Docxslotshint2Inputs) => LocalizedString;
export const templates_imageslotshint2: (inputs: Templates_Imageslotshint2Inputs) => LocalizedString;
export const templates_couldnotscan2: (inputs: Templates_Couldnotscan2Inputs) => LocalizedString;
export const templates_slotscanbetyped3: (inputs: Templates_Slotscanbetyped3Inputs) => LocalizedString;
export const templates_slotaria1: (inputs: Templates_Slotaria1Inputs) => LocalizedString;
export const templates_removeslotaria2: (inputs: Templates_Removeslotaria2Inputs) => LocalizedString;
export const templates_addslot1: (inputs: Templates_Addslot1Inputs) => LocalizedString;
export const templates_outputpatternfield2: (inputs: Templates_Outputpatternfield2Inputs) => LocalizedString;
export const templates_outputpatternplaceholder2: (inputs: Templates_Outputpatternplaceholder2Inputs) => LocalizedString;
export const templates_registertemplate1: (inputs: Templates_Registertemplate1Inputs) => LocalizedString;
export const templates_savechanges1: (inputs: Templates_Savechanges1Inputs) => LocalizedString;
export const templates_deletetitle1: (inputs: Templates_Deletetitle1Inputs) => LocalizedString;
export const templates_deletedescription1: (inputs: Templates_Deletedescription1Inputs) => LocalizedString;
export const templates_thistemplate1: (inputs: Templates_Thistemplate1Inputs) => LocalizedString;
export const templates_countregisteredone2: (inputs: Templates_Countregisteredone2Inputs) => LocalizedString;
export const templates_countregisteredother2: (inputs: Templates_Countregisteredother2Inputs) => LocalizedString;
export const templates_slotcountone2: (inputs: Templates_Slotcountone2Inputs) => LocalizedString;
export const templates_slotcountother2: (inputs: Templates_Slotcountother2Inputs) => LocalizedString;
export const importpage_title1: (inputs: Importpage_Title1Inputs) => LocalizedString;
export const importpage_description1: (inputs: Importpage_Description1Inputs) => LocalizedString;
export const importpage_importanotherfile3: (inputs: Importpage_Importanotherfile3Inputs) => LocalizedString;
export const importpage_dragdrophint3: (inputs: Importpage_Dragdrophint3Inputs) => LocalizedString;
export const importpage_fileformathint3: (inputs: Importpage_Fileformathint3Inputs) => LocalizedString;
export const importpage_parsing1: (inputs: Importpage_Parsing1Inputs) => LocalizedString;
export const importpage_importcomplete2: (inputs: Importpage_Importcomplete2Inputs) => LocalizedString;
export const importpage_gotocompose3: (inputs: Importpage_Gotocompose3Inputs) => LocalizedString;
export const importpage_gotorecipients3: (inputs: Importpage_Gotorecipients3Inputs) => LocalizedString;
export const importpage_couldnotread3: (inputs: Importpage_Couldnotread3Inputs) => LocalizedString;
export const importpage_notexcelfile3: (inputs: Importpage_Notexcelfile3Inputs) => LocalizedString;
export const importpage_couldnotcommit3: (inputs: Importpage_Couldnotcommit3Inputs) => LocalizedString;
export const importpage_preview1: (inputs: Importpage_Preview1Inputs) => LocalizedString;
export const importpage_previewrows2: (inputs: Importpage_Previewrows2Inputs) => LocalizedString;
export const importpage_columnmapping2: (inputs: Importpage_Columnmapping2Inputs) => LocalizedString;
export const importpage_columnmappinghint3: (inputs: Importpage_Columnmappinghint3Inputs) => LocalizedString;
export const importpage_columnrolearia3: (inputs: Importpage_Columnrolearia3Inputs) => LocalizedString;
export const importpage_resetmapping2: (inputs: Importpage_Resetmapping2Inputs) => LocalizedString;
export const importpage_selectnamecolumn3: (inputs: Importpage_Selectnamecolumn3Inputs) => LocalizedString;
export const importpage_importing1: (inputs: Importpage_Importing1Inputs) => LocalizedString;
export const importpage_importrecipients2: (inputs: Importpage_Importrecipients2Inputs) => LocalizedString;
export const importpage_nodatarows3: (inputs: Importpage_Nodatarows3Inputs) => LocalizedString;
export const importpage_rolename2: (inputs: Importpage_Rolename2Inputs) => LocalizedString;
export const importpage_roleemail2: (inputs: Importpage_Roleemail2Inputs) => LocalizedString;
export const importpage_rolephone2: (inputs: Importpage_Rolephone2Inputs) => LocalizedString;
export const importpage_rolemetadata2: (inputs: Importpage_Rolemetadata2Inputs) => LocalizedString;
export const importpage_roleskip2: (inputs: Importpage_Roleskip2Inputs) => LocalizedString;
export const importpage_importcompletedetailone4: (inputs: Importpage_Importcompletedetailone4Inputs) => LocalizedString;
export const importpage_importcompletedetailother4: (inputs: Importpage_Importcompletedetailother4Inputs) => LocalizedString;
export const importpage_rowsskippednonameone5: (inputs: Importpage_Rowsskippednonameone5Inputs) => LocalizedString;
export const importpage_rowsskippednonameother5: (inputs: Importpage_Rowsskippednonameother5Inputs) => LocalizedString;
export const importpage_importedtoastone3: (inputs: Importpage_Importedtoastone3Inputs) => LocalizedString;
export const importpage_importedtoastother3: (inputs: Importpage_Importedtoastother3Inputs) => LocalizedString;
export const importpage_duplicatesskippedparsingone4: (inputs: Importpage_Duplicatesskippedparsingone4Inputs) => LocalizedString;
export const importpage_duplicatesskippedparsingother4: (inputs: Importpage_Duplicatesskippedparsingother4Inputs) => LocalizedString;
export const recipients_title: (inputs: Recipients_TitleInputs) => LocalizedString;
export const recipients_couldnotdelete2: (inputs: Recipients_Couldnotdelete2Inputs) => LocalizedString;
export const recipients_deleteselected1: (inputs: Recipients_Deleteselected1Inputs) => LocalizedString;
export const recipients_deleteselectedcount2: (inputs: Recipients_Deleteselectedcount2Inputs) => LocalizedString;
export const recipients_searchplaceholder1: (inputs: Recipients_Searchplaceholder1Inputs) => LocalizedString;
export const recipients_searcharia1: (inputs: Recipients_Searcharia1Inputs) => LocalizedString;
export const recipients_filterbybatch2: (inputs: Recipients_Filterbybatch2Inputs) => LocalizedString;
export const recipients_allbatches1: (inputs: Recipients_Allbatches1Inputs) => LocalizedString;
export const recipients_couldnotload2: (inputs: Recipients_Couldnotload2Inputs) => LocalizedString;
export const recipients_loadingrecipients1: (inputs: Recipients_Loadingrecipients1Inputs) => LocalizedString;
export const recipients_norecipientsyet2: (inputs: Recipients_Norecipientsyet2Inputs) => LocalizedString;
export const recipients_norecipientshint2: (inputs: Recipients_Norecipientshint2Inputs) => LocalizedString;
export const recipients_gotoimport2: (inputs: Recipients_Gotoimport2Inputs) => LocalizedString;
export const recipients_nomatchfilters2: (inputs: Recipients_Nomatchfilters2Inputs) => LocalizedString;
export const recipients_nomatchhint2: (inputs: Recipients_Nomatchhint2Inputs) => LocalizedString;
export const recipients_clearfilters1: (inputs: Recipients_Clearfilters1Inputs) => LocalizedString;
export const recipients_showingrange1: (inputs: Recipients_Showingrange1Inputs) => LocalizedString;
export const recipients_previous: (inputs: Recipients_PreviousInputs) => LocalizedString;
export const recipients_next: (inputs: Recipients_NextInputs) => LocalizedString;
export const recipients_pageof1: (inputs: Recipients_Pageof1Inputs) => LocalizedString;
export const recipients_selectallonpage3: (inputs: Recipients_Selectallonpage3Inputs) => LocalizedString;
export const recipients_name: (inputs: Recipients_NameInputs) => LocalizedString;
export const recipients_email: (inputs: Recipients_EmailInputs) => LocalizedString;
export const recipients_phone: (inputs: Recipients_PhoneInputs) => LocalizedString;
export const recipients_importbatch1: (inputs: Recipients_Importbatch1Inputs) => LocalizedString;
export const recipients_imported: (inputs: Recipients_ImportedInputs) => LocalizedString;
export const recipients_selectrecipient1: (inputs: Recipients_Selectrecipient1Inputs) => LocalizedString;
export const recipients_noemailaddress2: (inputs: Recipients_Noemailaddress2Inputs) => LocalizedString;
export const recipients_customfields1: (inputs: Recipients_Customfields1Inputs) => LocalizedString;
export const recipients_nocustomfields2: (inputs: Recipients_Nocustomfields2Inputs) => LocalizedString;
export const recipients_deletedescription1: (inputs: Recipients_Deletedescription1Inputs) => LocalizedString;
export const recipients_countindirectoryone3: (inputs: Recipients_Countindirectoryone3Inputs) => LocalizedString;
export const recipients_countindirectoryother3: (inputs: Recipients_Countindirectoryother3Inputs) => LocalizedString;
export const recipients_deletedcountone2: (inputs: Recipients_Deletedcountone2Inputs) => LocalizedString;
export const recipients_deletedcountother2: (inputs: Recipients_Deletedcountother2Inputs) => LocalizedString;
export const recipients_deletetitleone2: (inputs: Recipients_Deletetitleone2Inputs) => LocalizedString;
export const recipients_deletetitleother2: (inputs: Recipients_Deletetitleother2Inputs) => LocalizedString;
export const logs_title: (inputs: Logs_TitleInputs) => LocalizedString;
export const logs_description: (inputs: Logs_DescriptionInputs) => LocalizedString;
export const logs_filterbystatus2: (inputs: Logs_Filterbystatus2Inputs) => LocalizedString;
export const logs_allstatuses1: (inputs: Logs_Allstatuses1Inputs) => LocalizedString;
export const logs_from: (inputs: Logs_FromInputs) => LocalizedString;
export const logs_to: (inputs: Logs_ToInputs) => LocalizedString;
export const logs_jobscreatedfrom2: (inputs: Logs_Jobscreatedfrom2Inputs) => LocalizedString;
export const logs_jobscreatedupto3: (inputs: Logs_Jobscreatedupto3Inputs) => LocalizedString;
export const logs_couldnotload2: (inputs: Logs_Couldnotload2Inputs) => LocalizedString;
export const logs_loadinglogs1: (inputs: Logs_Loadinglogs1Inputs) => LocalizedString;
export const logs_nojobsmatchfilters3: (inputs: Logs_Nojobsmatchfilters3Inputs) => LocalizedString;
export const logs_nojobshint2: (inputs: Logs_Nojobshint2Inputs) => LocalizedString;
export const logs_nosendjobsyet3: (inputs: Logs_Nosendjobsyet3Inputs) => LocalizedString;
export const logs_nosendjobshint3: (inputs: Logs_Nosendjobshint3Inputs) => LocalizedString;
export const logs_status: (inputs: Logs_StatusInputs) => LocalizedString;
export const logs_subject: (inputs: Logs_SubjectInputs) => LocalizedString;
export const logs_template: (inputs: Logs_TemplateInputs) => LocalizedString;
export const logs_sentfailedskipped2: (inputs: Logs_Sentfailedskipped2Inputs) => LocalizedString;
export const logs_started: (inputs: Logs_StartedInputs) => LocalizedString;
export const logs_duration: (inputs: Logs_DurationInputs) => LocalizedString;
export const logs_pausedprogress1: (inputs: Logs_Pausedprogress1Inputs) => LocalizedString;
export const logs_resuming: (inputs: Logs_ResumingInputs) => LocalizedString;
export const jobdetail_alllogs2: (inputs: Jobdetail_Alllogs2Inputs) => LocalizedString;
export const jobdetail_jobdetail2: (inputs: Jobdetail_Jobdetail2Inputs) => LocalizedString;
export const jobdetail_counts1: (inputs: Jobdetail_Counts1Inputs) => LocalizedString;
export const jobdetail_resume1: (inputs: Jobdetail_Resume1Inputs) => LocalizedString;
export const jobdetail_retryallfailures3: (inputs: Jobdetail_Retryallfailures3Inputs) => LocalizedString;
export const jobdetail_template1: (inputs: Jobdetail_Template1Inputs) => LocalizedString;
export const jobdetail_smtp1: (inputs: Jobdetail_Smtp1Inputs) => LocalizedString;
export const jobdetail_sender1: (inputs: Jobdetail_Sender1Inputs) => LocalizedString;
export const jobdetail_startedduration2: (inputs: Jobdetail_Startedduration2Inputs) => LocalizedString;
export const jobdetail_deletedprofile2: (inputs: Jobdetail_Deletedprofile2Inputs) => LocalizedString;
export const jobdetail_inline1: (inputs: Jobdetail_Inline1Inputs) => LocalizedString;
export const jobdetail_recipient1: (inputs: Jobdetail_Recipient1Inputs) => LocalizedString;
export const jobdetail_noemailaddress3: (inputs: Jobdetail_Noemailaddress3Inputs) => LocalizedString;
export const jobdetail_error1: (inputs: Jobdetail_Error1Inputs) => LocalizedString;
export const jobdetail_sentat2: (inputs: Jobdetail_Sentat2Inputs) => LocalizedString;
export const jobdetail_messageid2: (inputs: Jobdetail_Messageid2Inputs) => LocalizedString;
export const jobdetail_retry1: (inputs: Jobdetail_Retry1Inputs) => LocalizedString;
export const jobdetail_searchplaceholder2: (inputs: Jobdetail_Searchplaceholder2Inputs) => LocalizedString;
export const jobdetail_searcharia2: (inputs: Jobdetail_Searcharia2Inputs) => LocalizedString;
export const jobdetail_filterbystatus3: (inputs: Jobdetail_Filterbystatus3Inputs) => LocalizedString;
export const jobdetail_loadingjob2: (inputs: Jobdetail_Loadingjob2Inputs) => LocalizedString;
export const jobdetail_couldnotload3: (inputs: Jobdetail_Couldnotload3Inputs) => LocalizedString;
export const jobdetail_jobnotfound3: (inputs: Jobdetail_Jobnotfound3Inputs) => LocalizedString;
export const jobdetail_jobnotfoundhint4: (inputs: Jobdetail_Jobnotfoundhint4Inputs) => LocalizedString;
export const jobdetail_backtologs3: (inputs: Jobdetail_Backtologs3Inputs) => LocalizedString;
export const jobdetail_nomatchsearch3: (inputs: Jobdetail_Nomatchsearch3Inputs) => LocalizedString;
export const jobdetail_nomatchhint3: (inputs: Jobdetail_Nomatchhint3Inputs) => LocalizedString;
export const jobdetail_status1: (inputs: Jobdetail_Status1Inputs) => LocalizedString;
export const sendjob_selectrecipients2: (inputs: Sendjob_Selectrecipients2Inputs) => LocalizedString;
export const sendjob_writesubject2: (inputs: Sendjob_Writesubject2Inputs) => LocalizedString;
export const sendjob_writebody2: (inputs: Sendjob_Writebody2Inputs) => LocalizedString;
export const sendjob_entersender2: (inputs: Sendjob_Entersender2Inputs) => LocalizedString;
export const sendjob_chooseoneidentity3: (inputs: Sendjob_Chooseoneidentity3Inputs) => LocalizedString;
export const sendjob_norecipientsexist3: (inputs: Sendjob_Norecipientsexist3Inputs) => LocalizedString;
export const sendjob_alreadysending2: (inputs: Sendjob_Alreadysending2Inputs) => LocalizedString;
export const sendjob_anothersendactive3: (inputs: Sendjob_Anothersendactive3Inputs) => LocalizedString;
export const sendjob_stillpausing2: (inputs: Sendjob_Stillpausing2Inputs) => LocalizedString;
export const sendjob_onlysendingcanpause4: (inputs: Sendjob_Onlysendingcanpause4Inputs) => LocalizedString;
export const sendjob_onlypausedcanresume4: (inputs: Sendjob_Onlypausedcanresume4Inputs) => LocalizedString;
export const sendjob_finishedcannotcancel3: (inputs: Sendjob_Finishedcannotcancel3Inputs) => LocalizedString;
export const sendjob_onlyfinishedcanretry4: (inputs: Sendjob_Onlyfinishedcanretry4Inputs) => LocalizedString;
export const sendjob_nofailedrecipients3: (inputs: Sendjob_Nofailedrecipients3Inputs) => LocalizedString;
export const sendjob_noconfirmedattachments3: (inputs: Sendjob_Noconfirmedattachments3Inputs) => LocalizedString;
export const sendjob_attachmentsmissingondisk4: (inputs: Sendjob_Attachmentsmissingondisk4Inputs) => LocalizedString;
export const sendjob_recipientdeleted2: (inputs: Sendjob_Recipientdeleted2Inputs) => LocalizedString;
export const sendjob_recipientnoemail3: (inputs: Sendjob_Recipientnoemail3Inputs) => LocalizedString;
export const sendjob_noattachmentforrecipient4: (inputs: Sendjob_Noattachmentforrecipient4Inputs) => LocalizedString;
export const sendjob_retriesexhausted2: (inputs: Sendjob_Retriesexhausted2Inputs) => LocalizedString;
export const sendjob_couldnotresumejob4: (inputs: Sendjob_Couldnotresumejob4Inputs) => LocalizedString;
export const generatejob_templatemissing2: (inputs: Generatejob_Templatemissing2Inputs) => LocalizedString;
export const generatejob_templatefilemissing3: (inputs: Generatejob_Templatefilemissing3Inputs) => LocalizedString;
export const generatejob_libreofficemissing3: (inputs: Generatejob_Libreofficemissing3Inputs) => LocalizedString;
export const generatejob_recipientdeleted2: (inputs: Generatejob_Recipientdeleted2Inputs) => LocalizedString;
export const generatejob_missingslotdata3: (inputs: Generatejob_Missingslotdata3Inputs) => LocalizedString;
export const generatejob_couldnotfill3: (inputs: Generatejob_Couldnotfill3Inputs) => LocalizedString;
export const generatejob_nopdfproduced3: (inputs: Generatejob_Nopdfproduced3Inputs) => LocalizedString;
export const generatejob_selectrecipients2: (inputs: Generatejob_Selectrecipients2Inputs) => LocalizedString;
export const generatejob_norecipientsexist3: (inputs: Generatejob_Norecipientsexist3Inputs) => LocalizedString;
export const generatejob_jobcouldnotbecreated5: (inputs: Generatejob_Jobcouldnotbecreated5Inputs) => LocalizedString;
export const generatejob_nofreefilename4: (inputs: Generatejob_Nofreefilename4Inputs) => LocalizedString;
export const templatesservice_docxonly2: (inputs: Templatesservice_Docxonly2Inputs) => LocalizedString;
export const templatesservice_couldnotread3: (inputs: Templatesservice_Couldnotread3Inputs) => LocalizedString;
export const importservice_nonamecolumn3: (inputs: Importservice_Nonamecolumn3Inputs) => LocalizedString;
export const importservice_noemailcolumn3: (inputs: Importservice_Noemailcolumn3Inputs) => LocalizedString;
export const importservice_notexcel2: (inputs: Importservice_Notexcel2Inputs) => LocalizedString;
export const importservice_duplicateheaders2: (inputs: Importservice_Duplicateheaders2Inputs) => LocalizedString;
export const importservice_rowsskippedemptyname4: (inputs: Importservice_Rowsskippedemptyname4Inputs) => LocalizedString;
export const validation_smtpnamerequired2: (inputs: Validation_Smtpnamerequired2Inputs) => LocalizedString;
export const validation_smtphostrequired2: (inputs: Validation_Smtphostrequired2Inputs) => LocalizedString;
export const validation_smtpportinvalid2: (inputs: Validation_Smtpportinvalid2Inputs) => LocalizedString;
export const validation_smtpusernamerequired2: (inputs: Validation_Smtpusernamerequired2Inputs) => LocalizedString;
export const validation_smtppasswordrequired2: (inputs: Validation_Smtppasswordrequired2Inputs) => LocalizedString;
export const validation_templatenamerequired2: (inputs: Validation_Templatenamerequired2Inputs) => LocalizedString;
export const validation_templateneedsslot2: (inputs: Validation_Templateneedsslot2Inputs) => LocalizedString;
export const validation_templatepatternneedsslot3: (inputs: Validation_Templatepatternneedsslot3Inputs) => LocalizedString;
export const validation_templatepatternunknownslot3: (inputs: Validation_Templatepatternunknownslot3Inputs) => LocalizedString;
export const dialogs_excelfilter1: (inputs: Dialogs_Excelfilter1Inputs) => LocalizedString;
export const dialogs_templatefilter1: (inputs: Dialogs_Templatefilter1Inputs) => LocalizedString;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_BackInputs = {};
export type Common_NextInputs = {};
export type Common_CancelInputs = {};
export type Common_SaveInputs = {};
export type Common_DeleteInputs = {};
export type Common_RetryInputs = {};
export type Common_ResumeInputs = {};
export type Common_PauseInputs = {};
export type Common_PrevInputs = {};
export type Common_ClearInputs = {};
export type Common_DismissInputs = {};
export type Common_BrowseInputs = {};
export type Common_LoadingInputs = {};
export type Common_SavedInputs = {};
export type Common_SavingInputs = {};
export type Common_DeletingInputs = {};
export type Common_TestingInputs = {};
export type Common_Closedetails1Inputs = {};
export type Common_Couldnotload2Inputs = {
    key: NonNullable<unknown>;
};
export type Common_Couldnotsave2Inputs = {
    key: NonNullable<unknown>;
};
export type Common_Retryfailures1Inputs = {};
export type Nav_ImportInputs = {};
export type Nav_RecipientsInputs = {};
export type Nav_TemplatesInputs = {};
export type Nav_ComposeInputs = {};
export type Nav_LogsInputs = {};
export type Nav_SettingsInputs = {};
export type App_Backendunreachable1Inputs = {};
export type Welcome_TitleInputs = {};
export type Welcome_SubtitleInputs = {};
export type Welcome_Checkinglibreoffice2Inputs = {};
export type Welcome_Libreofficepurpose2Inputs = {};
export type Welcome_Libreofficefound2Inputs = {};
export type Welcome_Libreofficemissing2Inputs = {};
export type Welcome_Libreofficemissingdetail3Inputs = {};
export type Welcome_Installwith1Inputs = {};
export type Welcome_Downloadfrom1Inputs = {};
export type Welcome_Checkagain1Inputs = {};
export type Welcome_Templatesfolder1Inputs = {};
export type Welcome_Outputfolder1Inputs = {};
export type Welcome_Settingup1Inputs = {};
export type Welcome_Getstarted1Inputs = {};
export type Status_PendingInputs = {};
export type Status_SendingInputs = {};
export type Status_PausedInputs = {};
export type Status_CompletedInputs = {};
export type Status_CancelledInputs = {};
export type Status_FailedInputs = {};
export type Status_SkippedInputs = {};
export type Status_SentInputs = {};
export type Settingspage_Title1Inputs = {};
export type Settingspage_Description1Inputs = {};
export type Settingspage_Ratelimiting2Inputs = {};
export type Settingspage_Ratelimitingdescription3Inputs = {};
export type Settingspage_Msperemail3Inputs = {
    ms: NonNullable<unknown>;
};
export type Settingspage_Delaybetweenemails3Inputs = {};
export type Settingspage_Defaultfolders2Inputs = {};
export type Settingspage_Defaultfoldersdescription3Inputs = {};
export type Settingspage_Templatesfolder2Inputs = {};
export type Settingspage_Outputfolder2Inputs = {};
export type Settingspage_About1Inputs = {};
export type Settingspage_App1Inputs = {};
export type Settingspage_Version1Inputs = {};
export type Settingspage_Data1Inputs = {};
export type Settingspage_Storedlocally2Inputs = {};
export type Settingspage_Language1Inputs = {};
export type Settingspage_Languagedescription2Inputs = {};
export type Settingspage_Ratepersecondone4Inputs = {
    rate: NonNullable<unknown>;
};
export type Settingspage_Ratepersecondother4Inputs = {
    rate: NonNullable<unknown>;
};
export type Settingspage_Couldnotload3Inputs = {};
export type Smtp_TitleInputs = {};
export type Smtp_DescriptionInputs = {};
export type Smtp_Addprofile1Inputs = {};
export type Smtp_Profilesaved1Inputs = {
    name: NonNullable<unknown>;
};
export type Smtp_Profiledeleted1Inputs = {};
export type Smtp_Couldnotsaveprofile3Inputs = {};
export type Smtp_Couldnotdeleteprofile3Inputs = {};
export type Smtp_Couldnotloadprofiles3Inputs = {};
export type Smtp_Loadingprofiles1Inputs = {};
export type Smtp_Noprofilesyet2Inputs = {};
export type Smtp_Noprofilesdescription2Inputs = {};
export type Smtp_Testconnection1Inputs = {};
export type Smtp_Connectionok1Inputs = {};
export type Smtp_ConnectedInputs = {};
export type Smtp_Connectionfailed1Inputs = {};
export type Smtp_Passwordnotset2Inputs = {};
export type Smtp_Addprofiletitle2Inputs = {};
export type Smtp_Editprofiletitle2Inputs = {
    name: NonNullable<unknown>;
};
export type Smtp_Createhint1Inputs = {};
export type Smtp_Edithint1Inputs = {};
export type Smtp_Profilename1Inputs = {};
export type Smtp_Smtphost1Inputs = {};
export type Smtp_PortInputs = {};
export type Smtp_Implicittls1Inputs = {};
export type Smtp_StarttlsInputs = {};
export type Smtp_UsernameInputs = {};
export type Smtp_Apppassword1Inputs = {};
export type Smtp_Leaveblanktokeep3Inputs = {};
export type Smtp_Gmailapppasswordhint3Inputs = {};
export type Smtp_Saveprofile1Inputs = {};
export type Smtp_Savechanges1Inputs = {};
export type Smtp_Deleteprofiletitle2Inputs = {
    name: NonNullable<unknown>;
};
export type Smtp_Deleteprofiledescription2Inputs = {};
export type Smtp_Passwordlabel1Inputs = {};
export type Compose_TitleInputs = {};
export type Compose_DescriptionInputs = {};
export type Compose_Steprecipients1Inputs = {};
export type Compose_Steptemplate1Inputs = {};
export type Compose_Stepmessage1Inputs = {};
export type Compose_Stepsmtp1Inputs = {};
export type Compose_Stepgenerate1Inputs = {};
export type Compose_Stepsend1Inputs = {};
export type Compose_Datacoversallslots3Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Unknownslotfooter2Inputs = {
    slot: NonNullable<unknown>;
};
export type Compose_Writesubjecttocontinue3Inputs = {};
export type Compose_Writebodytocontinue3Inputs = {};
export type Compose_Messagelooksgood2Inputs = {};
export type Compose_Connectiondetailsready2Inputs = {};
export type Compose_Completesmtpdetails2Inputs = {};
export type Compose_Generatedfailedfooter2Inputs = {
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
};
export type Compose_Prefillreenterpassword2Inputs = {};
export type Compose_Searchrecipients1Inputs = {};
export type Compose_Searchplaceholder1Inputs = {};
export type Compose_Filterbybatch2Inputs = {};
export type Compose_Allbatches1Inputs = {};
export type Compose_Batchoption1Inputs = {
    count: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
export type Compose_Selectallmatchingtitle3Inputs = {
    total: NonNullable<unknown>;
};
export type Compose_Selectallcount2Inputs = {
    total: NonNullable<unknown>;
};
export type Compose_Couldnotloadrecipients3Inputs = {};
export type Compose_Norecipientsyet2Inputs = {};
export type Compose_Norecipientsmatchfilter3Inputs = {};
export type Compose_Norecipientshint2Inputs = {};
export type Compose_Gotoimport2Inputs = {};
export type Compose_Trydifferentfilter2Inputs = {};
export type Compose_Selectallonpage3Inputs = {};
export type Compose_NameInputs = {};
export type Compose_EmailInputs = {};
export type Compose_PhoneInputs = {};
export type Compose_Selectrecipient1Inputs = {
    name: NonNullable<unknown>;
};
export type Compose_Selectioncount1Inputs = {
    selected: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Pageof1Inputs = {
    page: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Templatelabel1Inputs = {};
export type Compose_Choosetemplate1Inputs = {};
export type Compose_Notemplatesregistered2Inputs = {};
export type Compose_Registertemplatelink2Inputs = {};
export type Compose_Notemplatesregisteredhint3Inputs = {};
export type Compose_Requiredslots1Inputs = {};
export type Compose_Outputpattern1Inputs = {};
export type Compose_Allcovered1Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Missingdatasummary2Inputs = {
    missing: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
export type Compose_Missingdatahint2Inputs = {};
export type Compose_SubjectInputs = {};
export type Compose_Subjectplaceholder1Inputs = {
    name: NonNullable<unknown>;
    instansi: NonNullable<unknown>;
};
export type Compose_Bodylabel1Inputs = {};
export type Compose_Bodyplaceholder1Inputs = {
    name: NonNullable<unknown>;
};
export type Compose_Unknownslothint2Inputs = {};
export type Compose_Missingslottitle2Inputs = {
    list: NonNullable<unknown>;
};
export type Compose_Missingslothint2Inputs = {};
export type Compose_Livepreview1Inputs = {};
export type Compose_Previewfor1Inputs = {
    name: NonNullable<unknown>;
};
export type Compose_Emailconnection1Inputs = {};
export type Compose_Savedprofile1Inputs = {};
export type Compose_Enterdetails1Inputs = {};
export type Compose_Chooseprofile1Inputs = {};
export type Compose_Nosavedprofileshint3Inputs = {};
export type Compose_Settingslink1Inputs = {};
export type Compose_HostInputs = {};
export type Compose_Portlabel1Inputs = {};
export type Compose_Usernamelabel1Inputs = {};
export type Compose_Apppasswordlabel2Inputs = {};
export type Compose_Saveasprofile2Inputs = {};
export type Compose_Profilenameplaceholder2Inputs = {};
export type Compose_Testconnectionbutton2Inputs = {};
export type Compose_Senderidentity1Inputs = {};
export type Compose_Sendername1Inputs = {};
export type Compose_Senderaddress1Inputs = {};
export type Compose_Sendingrate1Inputs = {};
export type Compose_Sendingratems2Inputs = {
    ms: NonNullable<unknown>;
};
export type Compose_Sendingratehint2Inputs = {};
export type Compose_Generationfailed1Inputs = {};
export type Compose_Connectionfailed1Inputs = {};
export type Compose_Choosetemplatefirst2Inputs = {};
export type Compose_Campaignsummary1Inputs = {};
export type Compose_RecipientsInputs = {};
export type Compose_TemplateInputs = {};
export type Compose_Outputfolder1Inputs = {};
export type Compose_Campaignsummaryhint2Inputs = {};
export type Compose_Generatepdfs1Inputs = {};
export type Compose_GeneratingInputs = {};
export type Compose_Oftotal1Inputs = {
    current: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Generatedcounts1Inputs = {
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    pending: NonNullable<unknown>;
};
export type Compose_Tryagain1Inputs = {};
export type Compose_Allgenerated1Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Generatedwithfailures2Inputs = {
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
};
export type Compose_Failedrecipientstitle2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Spotcheck1Inputs = {};
export type Compose_Spotindex1Inputs = {
    index: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Loadingpreview1Inputs = {};
export type Compose_Sendsummary1Inputs = {};
export type Compose_SenderInputs = {};
export type Compose_ConnectionInputs = {};
export type Compose_PacingInputs = {};
export type Compose_AttachmentsInputs = {};
export type Compose_Generatedpdfscount2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Preflighthint1Inputs = {};
export type Compose_Nogeneratedattachments2Inputs = {};
export type Compose_Preparingsend1Inputs = {};
export type Compose_SendingInputs = {};
export type Compose_Sendcounts1Inputs = {
    sent: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    pending: NonNullable<unknown>;
};
export type Compose_Windingdowntitle2Inputs = {};
export type Compose_Cancelsendconfirm2Inputs = {
    current: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Perrecipientlog2Inputs = {};
export type Compose_Waitingfirstemail2Inputs = {};
export type Compose_Allemailssent2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Sentwithfailures2Inputs = {
    sent: NonNullable<unknown>;
    failed: NonNullable<unknown>;
};
export type Compose_Sendcancelled1Inputs = {};
export type Compose_Cancelleddetail1Inputs = {
    sent: NonNullable<unknown>;
    skipped: NonNullable<unknown>;
};
export type Compose_RecipientInputs = {};
export type Compose_Rowskipped1Inputs = {};
export type Compose_Sendingfailed1Inputs = {};
export type Compose_Couldnotstartsend3Inputs = {};
export type Compose_Couldnotpausesend3Inputs = {};
export type Compose_Couldnotcancelsend3Inputs = {};
export type Compose_Couldnotretryfailures3Inputs = {};
export type Compose_Sendjobnolongerexists4Inputs = {};
export type Compose_Couldnotresumesend3Inputs = {};
export type Compose_Recipientsselectedone2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Recipientsselectedother2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Prefillretryone2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Prefillretryother2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Prefilldeletedone2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Prefilldeletedother2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Slotmissingcountone3Inputs = {
    slot: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
export type Compose_Slotmissingcountother3Inputs = {
    slot: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
export type Compose_Unknownslottitleone3Inputs = {
    list: NonNullable<unknown>;
};
export type Compose_Unknownslottitleother3Inputs = {
    list: NonNullable<unknown>;
};
export type Compose_Livepreviewhintone3Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Livepreviewhintother3Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Sendcountone2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Sendcountother2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Apppasswordplaceholder2Inputs = {};
export type Templates_TitleInputs = {};
export type Templates_Addtemplate1Inputs = {};
export type Templates_Templateregistered1Inputs = {
    name: NonNullable<unknown>;
};
export type Templates_Templatesaved1Inputs = {
    name: NonNullable<unknown>;
};
export type Templates_Templatedeleted1Inputs = {};
export type Templates_Couldnotregister2Inputs = {};
export type Templates_Couldnotsave2Inputs = {};
export type Templates_Couldnotdelete2Inputs = {};
export type Templates_Couldnotload2Inputs = {};
export type Templates_Loadingtemplates1Inputs = {};
export type Templates_Notemplatesyet2Inputs = {};
export type Templates_Notemplateshint2Inputs = {};
export type Templates_Unsupportedfile1Inputs = {
    fileName: NonNullable<unknown>;
};
export type Templates_RegisteredInputs = {};
export type Templates_SlotsInputs = {};
export type Templates_Noslotsdeclared2Inputs = {};
export type Templates_Outputpatternhint2Inputs = {};
export type Templates_Editexternallyhint2Inputs = {};
export type Templates_EditInputs = {};
export type Templates_Addtitle1Inputs = {};
export type Templates_Edittitle1Inputs = {
    name: NonNullable<unknown>;
};
export type Templates_Templatename1Inputs = {};
export type Templates_ScanningInputs = {};
export type Templates_Rescanfromfile2Inputs = {};
export type Templates_Rescanconfirm1Inputs = {};
export type Templates_Replaceslots1Inputs = {};
export type Templates_Keepmyslots2Inputs = {};
export type Templates_Docxslotshint2Inputs = {
    placeholders: NonNullable<unknown>;
};
export type Templates_Imageslotshint2Inputs = {};
export type Templates_Couldnotscan2Inputs = {};
export type Templates_Slotscanbetyped3Inputs = {};
export type Templates_Slotaria1Inputs = {
    index: NonNullable<unknown>;
};
export type Templates_Removeslotaria2Inputs = {
    index: NonNullable<unknown>;
};
export type Templates_Addslot1Inputs = {};
export type Templates_Outputpatternfield2Inputs = {};
export type Templates_Outputpatternplaceholder2Inputs = {
    no: NonNullable<unknown>;
    name: NonNullable<unknown>;
};
export type Templates_Registertemplate1Inputs = {};
export type Templates_Savechanges1Inputs = {};
export type Templates_Deletetitle1Inputs = {
    name: NonNullable<unknown>;
};
export type Templates_Deletedescription1Inputs = {};
export type Templates_Thistemplate1Inputs = {};
export type Templates_Countregisteredone2Inputs = {
    count: NonNullable<unknown>;
};
export type Templates_Countregisteredother2Inputs = {
    count: NonNullable<unknown>;
};
export type Templates_Slotcountone2Inputs = {
    count: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
export type Templates_Slotcountother2Inputs = {
    count: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
export type Importpage_Title1Inputs = {};
export type Importpage_Description1Inputs = {};
export type Importpage_Importanotherfile3Inputs = {};
export type Importpage_Dragdrophint3Inputs = {};
export type Importpage_Fileformathint3Inputs = {};
export type Importpage_Parsing1Inputs = {
    fileName: NonNullable<unknown>;
};
export type Importpage_Importcomplete2Inputs = {};
export type Importpage_Gotocompose3Inputs = {};
export type Importpage_Gotorecipients3Inputs = {};
export type Importpage_Couldnotread3Inputs = {};
export type Importpage_Notexcelfile3Inputs = {
    fileName: NonNullable<unknown>;
};
export type Importpage_Couldnotcommit3Inputs = {};
export type Importpage_Preview1Inputs = {};
export type Importpage_Previewrows2Inputs = {
    fileName: NonNullable<unknown>;
    shown: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Importpage_Columnmapping2Inputs = {};
export type Importpage_Columnmappinghint3Inputs = {};
export type Importpage_Columnrolearia3Inputs = {
    column: NonNullable<unknown>;
};
export type Importpage_Resetmapping2Inputs = {};
export type Importpage_Selectnamecolumn3Inputs = {};
export type Importpage_Importing1Inputs = {};
export type Importpage_Importrecipients2Inputs = {};
export type Importpage_Nodatarows3Inputs = {};
export type Importpage_Rolename2Inputs = {};
export type Importpage_Roleemail2Inputs = {};
export type Importpage_Rolephone2Inputs = {};
export type Importpage_Rolemetadata2Inputs = {};
export type Importpage_Roleskip2Inputs = {};
export type Importpage_Importcompletedetailone4Inputs = {
    imported: NonNullable<unknown>;
    fileName: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
export type Importpage_Importcompletedetailother4Inputs = {
    imported: NonNullable<unknown>;
    fileName: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
export type Importpage_Rowsskippednonameone5Inputs = {
    count: NonNullable<unknown>;
};
export type Importpage_Rowsskippednonameother5Inputs = {
    count: NonNullable<unknown>;
};
export type Importpage_Importedtoastone3Inputs = {
    imported: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
export type Importpage_Importedtoastother3Inputs = {
    imported: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
export type Importpage_Duplicatesskippedparsingone4Inputs = {
    count: NonNullable<unknown>;
};
export type Importpage_Duplicatesskippedparsingother4Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_TitleInputs = {};
export type Recipients_Couldnotdelete2Inputs = {};
export type Recipients_Deleteselected1Inputs = {};
export type Recipients_Deleteselectedcount2Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Searchplaceholder1Inputs = {};
export type Recipients_Searcharia1Inputs = {};
export type Recipients_Filterbybatch2Inputs = {};
export type Recipients_Allbatches1Inputs = {};
export type Recipients_Couldnotload2Inputs = {};
export type Recipients_Loadingrecipients1Inputs = {};
export type Recipients_Norecipientsyet2Inputs = {};
export type Recipients_Norecipientshint2Inputs = {};
export type Recipients_Gotoimport2Inputs = {};
export type Recipients_Nomatchfilters2Inputs = {};
export type Recipients_Nomatchhint2Inputs = {};
export type Recipients_Clearfilters1Inputs = {};
export type Recipients_Showingrange1Inputs = {
    from: NonNullable<unknown>;
    to: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Recipients_PreviousInputs = {};
export type Recipients_NextInputs = {};
export type Recipients_Pageof1Inputs = {
    page: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
export type Recipients_Selectallonpage3Inputs = {};
export type Recipients_NameInputs = {};
export type Recipients_EmailInputs = {};
export type Recipients_PhoneInputs = {};
export type Recipients_Importbatch1Inputs = {};
export type Recipients_ImportedInputs = {};
export type Recipients_Selectrecipient1Inputs = {
    name: NonNullable<unknown>;
};
export type Recipients_Noemailaddress2Inputs = {};
export type Recipients_Customfields1Inputs = {};
export type Recipients_Nocustomfields2Inputs = {};
export type Recipients_Deletedescription1Inputs = {};
export type Recipients_Countindirectoryone3Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Countindirectoryother3Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Deletedcountone2Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Deletedcountother2Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Deletetitleone2Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Deletetitleother2Inputs = {
    count: NonNullable<unknown>;
};
export type Logs_TitleInputs = {};
export type Logs_DescriptionInputs = {};
export type Logs_Filterbystatus2Inputs = {};
export type Logs_Allstatuses1Inputs = {};
export type Logs_FromInputs = {};
export type Logs_ToInputs = {};
export type Logs_Jobscreatedfrom2Inputs = {};
export type Logs_Jobscreatedupto3Inputs = {};
export type Logs_Couldnotload2Inputs = {};
export type Logs_Loadinglogs1Inputs = {};
export type Logs_Nojobsmatchfilters3Inputs = {};
export type Logs_Nojobshint2Inputs = {};
export type Logs_Nosendjobsyet3Inputs = {};
export type Logs_Nosendjobshint3Inputs = {};
export type Logs_StatusInputs = {};
export type Logs_SubjectInputs = {};
export type Logs_TemplateInputs = {};
export type Logs_Sentfailedskipped2Inputs = {};
export type Logs_StartedInputs = {};
export type Logs_DurationInputs = {};
export type Logs_Pausedprogress1Inputs = {
    sent: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Logs_ResumingInputs = {};
export type Jobdetail_Alllogs2Inputs = {};
export type Jobdetail_Jobdetail2Inputs = {};
export type Jobdetail_Counts1Inputs = {
    sent: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    skipped: NonNullable<unknown>;
};
export type Jobdetail_Resume1Inputs = {};
export type Jobdetail_Retryallfailures3Inputs = {
    count: NonNullable<unknown>;
};
export type Jobdetail_Template1Inputs = {};
export type Jobdetail_Smtp1Inputs = {};
export type Jobdetail_Sender1Inputs = {};
export type Jobdetail_Startedduration2Inputs = {};
export type Jobdetail_Deletedprofile2Inputs = {};
export type Jobdetail_Inline1Inputs = {};
export type Jobdetail_Recipient1Inputs = {};
export type Jobdetail_Noemailaddress3Inputs = {};
export type Jobdetail_Error1Inputs = {};
export type Jobdetail_Sentat2Inputs = {};
export type Jobdetail_Messageid2Inputs = {};
export type Jobdetail_Retry1Inputs = {};
export type Jobdetail_Searchplaceholder2Inputs = {};
export type Jobdetail_Searcharia2Inputs = {};
export type Jobdetail_Filterbystatus3Inputs = {};
export type Jobdetail_Loadingjob2Inputs = {};
export type Jobdetail_Couldnotload3Inputs = {};
export type Jobdetail_Jobnotfound3Inputs = {};
export type Jobdetail_Jobnotfoundhint4Inputs = {};
export type Jobdetail_Backtologs3Inputs = {};
export type Jobdetail_Nomatchsearch3Inputs = {};
export type Jobdetail_Nomatchhint3Inputs = {};
export type Jobdetail_Status1Inputs = {};
export type Sendjob_Selectrecipients2Inputs = {};
export type Sendjob_Writesubject2Inputs = {};
export type Sendjob_Writebody2Inputs = {};
export type Sendjob_Entersender2Inputs = {};
export type Sendjob_Chooseoneidentity3Inputs = {};
export type Sendjob_Norecipientsexist3Inputs = {};
export type Sendjob_Alreadysending2Inputs = {};
export type Sendjob_Anothersendactive3Inputs = {};
export type Sendjob_Stillpausing2Inputs = {};
export type Sendjob_Onlysendingcanpause4Inputs = {};
export type Sendjob_Onlypausedcanresume4Inputs = {};
export type Sendjob_Finishedcannotcancel3Inputs = {};
export type Sendjob_Onlyfinishedcanretry4Inputs = {};
export type Sendjob_Nofailedrecipients3Inputs = {};
export type Sendjob_Noconfirmedattachments3Inputs = {};
export type Sendjob_Attachmentsmissingondisk4Inputs = {};
export type Sendjob_Recipientdeleted2Inputs = {};
export type Sendjob_Recipientnoemail3Inputs = {};
export type Sendjob_Noattachmentforrecipient4Inputs = {};
export type Sendjob_Retriesexhausted2Inputs = {
    message: NonNullable<unknown>;
};
export type Sendjob_Couldnotresumejob4Inputs = {};
export type Generatejob_Templatemissing2Inputs = {};
export type Generatejob_Templatefilemissing3Inputs = {
    path: NonNullable<unknown>;
};
export type Generatejob_Libreofficemissing3Inputs = {};
export type Generatejob_Recipientdeleted2Inputs = {};
export type Generatejob_Missingslotdata3Inputs = {
    slot: NonNullable<unknown>;
};
export type Generatejob_Couldnotfill3Inputs = {
    message: NonNullable<unknown>;
};
export type Generatejob_Nopdfproduced3Inputs = {};
export type Generatejob_Selectrecipients2Inputs = {};
export type Generatejob_Norecipientsexist3Inputs = {};
export type Generatejob_Jobcouldnotbecreated5Inputs = {};
export type Generatejob_Nofreefilename4Inputs = {
    name: NonNullable<unknown>;
};
export type Templatesservice_Docxonly2Inputs = {};
export type Templatesservice_Couldnotread3Inputs = {
    path: NonNullable<unknown>;
    detail: NonNullable<unknown>;
};
export type Importservice_Nonamecolumn3Inputs = {};
export type Importservice_Noemailcolumn3Inputs = {};
export type Importservice_Notexcel2Inputs = {};
export type Importservice_Duplicateheaders2Inputs = {
    headers: NonNullable<unknown>;
};
export type Importservice_Rowsskippedemptyname4Inputs = {
    count: NonNullable<unknown>;
};
export type Validation_Smtpnamerequired2Inputs = {};
export type Validation_Smtphostrequired2Inputs = {};
export type Validation_Smtpportinvalid2Inputs = {};
export type Validation_Smtpusernamerequired2Inputs = {};
export type Validation_Smtppasswordrequired2Inputs = {};
export type Validation_Templatenamerequired2Inputs = {};
export type Validation_Templateneedsslot2Inputs = {};
export type Validation_Templatepatternneedsslot3Inputs = {
    name: NonNullable<unknown>;
};
export type Validation_Templatepatternunknownslot3Inputs = {
    slot: NonNullable<unknown>;
};
export type Dialogs_Excelfilter1Inputs = {};
export type Dialogs_Templatefilter1Inputs = {};
